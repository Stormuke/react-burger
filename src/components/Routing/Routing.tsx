import { lazy, useCallback, useEffect, useMemo } from 'react';
import type { RouteProps } from 'react-router-dom';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { AuthStore, CabinetStore, FeedStore, IngredientsStore } from 'services';
import { useAppDispatch, useAppSelector } from 'services/rootReducer';
import { getCookie } from 'utils/cookie';
import { isFulfilled, isRejected } from '@reduxjs/toolkit';
import { NotFound } from 'pages/NotFound/NotFound';
import { ProtectedRoute } from 'components/ProtectedRoute/ProtectedRoute';
import { Modal } from 'components/Modal/Modal';
import { IngredientsDetails } from 'components/IgredientsDetails/IngredientsDetails';
import { AppHeader } from 'components/AppHeader/AppHeader';

import styles from '../../pages/Constructor/styles.module.scss';
import { FeedDetails } from '../FeedDetails/FeedDetails';
import { FeedList } from '../FeedList/FeedList';
import { useCreateSliceActions } from '../../utils/useCreateSliceActions';

const Constructor = lazy(() => import('../../pages/Constructor/Constructor'));
const Cabinet = lazy(() => import('../../pages/Cabinet/Cabinet'));
const Auth = lazy(() => import('../../pages/Auth/Auth'));
const Feed = lazy(() => import('../../pages/Feed/Feed'));

type RoutingType = RouteProps & { protected: boolean };

const Routing = (): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  const location = useLocation<{
    isPopup: boolean;
  }>();
  const history = useHistory();
  const isPopup = location.state && location.state.isPopup;

  const feed = useAppSelector(FeedStore.selectors.feedSelector);
  const {
    wsConnectionStart,
    wsAuthConnectionStart,
    wsConnectionClosed,
    wsAuthConnectionClosed,
  } = useCreateSliceActions(FeedStore.reducers.slice.actions);

  /*****************************************************
   *                     Колбеки
   ***************************************************/

  const handleClose = (): void => {
    history.goBack();
  };

  const handleGetUser = useCallback(async () => {
    const res = await dispatch(
      CabinetStore.getUserDataThunk({
        url: 'auth/user',
        cookie: accessToken as string,
      }),
    );
    if (isRejected(res)) {
      const refresh = await dispatch(
        AuthStore.postAuthFormThunk({
          endpoint: 'auth/token',
          body: { token: refreshToken as string },
        }),
      );

      if (isFulfilled(refresh)) {
        dispatch(
          CabinetStore.getUserDataThunk({
            url: 'auth/user',
            cookie: accessToken as string,
          }),
        );
      }
    }
  }, [accessToken, dispatch, refreshToken]);

  /*****************************************************
   *                     Сайды
   ***************************************************/
  useEffect(() => {
    if (accessToken && accessToken !== '') {
      handleGetUser();
    }
    // eslint-disable-next-line
  }, [accessToken]);

  useEffect(() => {
    dispatch(IngredientsStore.getIngredientsThunk('ingredients'));
  }, []); // eslint-disable-line

  useEffect(() => {
    if (location.pathname.includes('feed')) {
      dispatch(wsConnectionStart);
    } else {
      dispatch(() =>
        wsConnectionClosed({ code: 1, reason: 'leaveFeed', wasClean: true }),
      );
    }
    if (location.pathname.includes('profile/orders') && accessToken !== '') {
      dispatch(wsAuthConnectionStart);
    } else {
      dispatch(() =>
        wsAuthConnectionClosed({
          code: 1,
          reason: 'leaveProfile',
          wasClean: true,
        }),
      );
    }
  }, [location.pathname]); // eslint-disable-line

  /*****************************************************
   *                     Мемоизация
   ***************************************************/
  const routes = useMemo<RoutingType[]>(
    () => [
      {
        path: '/',
        exact: true,
        children: <Constructor />,
        protected: false,
      },
      {
        path: '/feed',
        exact: true,
        children: <Feed />,
        protected: false,
      },

      {
        path: '/feed/:id',
        exact: true,
        children: isPopup ? (
          <Modal isOpened={isPopup} onClose={handleClose} title="">
            <FeedDetails feedArray={feed.orders.orders} />
          </Modal>
        ) : (
          <FeedDetails feedArray={feed.orders.orders} />
        ),
        protected: false,
      },
      {
        path: '/ingredients/:id',
        children: isPopup ? (
          <Modal
            isOpened={isPopup}
            onClose={handleClose}
            title="Детали ингредиента"
          >
            <IngredientsDetails />
          </Modal>
        ) : (
          <IngredientsDetails />
        ),
        exact: true,
        protected: false,
      },
      { path: '/login', children: <Auth />, protected: false },
      { path: '/register', children: <Auth />, protected: false },
      { path: '/forgot-password', children: <Auth />, protected: false },
      { path: '/reset-password', children: <Auth />, protected: false },
      {
        path: '/profile',
        children: (
          <ProtectedRoute>
            <Cabinet />
          </ProtectedRoute>
        ),
        exact: true,
        protected: true,
      },
      {
        path: '/profile/orders',
        children: (
          <ProtectedRoute>
            <Cabinet>
              <FeedList
                feedArray={feed.authState.currentUserOrders.orders}
                isFull
              />
            </Cabinet>
          </ProtectedRoute>
        ),
        exact: true,
        protected: true,
      },
      {
        path: '/profile/orders/:id',
        children: (
          <ProtectedRoute>
            {isPopup ? (
              <Modal isOpened={isPopup} onClose={handleClose} title="">
                <FeedDetails
                  feedArray={feed.authState.currentUserOrders.orders}
                />
              </Modal>
            ) : (
              <FeedDetails
                feedArray={feed.authState.currentUserOrders.orders}
              />
            )}
          </ProtectedRoute>
        ),
        exact: true,
        protected: true,
      },
      {
        path: '*',
        children: <NotFound />,
        protected: false,
      },
    ],
    // eslint-disable-next-line
    [isPopup, feed.orders.orders, feed.authState.currentUserOrders.orders],
  );

  /*****************************************************
   *                     UI
   ***************************************************/
  return (
    <Switch>
      {routes.map((route) => (
        <Route path={route.path} key={route.path as string} exact={route.exact}>
          <div className={styles.page}>
            <AppHeader />
            {route.children}
          </div>
        </Route>
      ))}
    </Switch>
  );
};

export default Routing;
