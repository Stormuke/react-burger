import { lazy, useCallback, useEffect, useMemo } from 'react';
import type { RouteProps } from 'react-router-dom';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { AuthStore, CabinetStore, IngredientsStore } from 'services';
import { useAppDispatch } from 'services/rootReducer';
import { getCookie } from 'utils/cookie';
import { isFulfilled, isRejected } from '@reduxjs/toolkit';
import { NotFound } from 'pages/NotFound/NotFound';
import { ProtectedRoute } from 'components/ProtectedRoute/ProtectedRoute';
import { Modal } from 'components/Modal/Modal';
import { IngredientsDetails } from 'components/IgredientsDetails/IngredientsDetails';
import { AppHeader } from 'components/AppHeader/AppHeader';

import styles from '../../pages/Constructor/styles.module.scss';

const Constructor = lazy(() => import('../../pages/Constructor/Constructor'));
const Cabinet = lazy(() => import('../../pages/Cabinet/Cabinet'));
const Auth = lazy(() => import('../../pages/Auth/Auth'));

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

  /*****************************************************
   *                     Экшены
   ***************************************************/

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
    if (accessToken) {
      handleGetUser();
    }
    // eslint-disable-next-line
  }, [accessToken]);

  useEffect(() => {
    dispatch(IngredientsStore.getIngredientsThunk('ingredients'));
  }, []); // eslint-disable-line

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
              <NotFound isSmall />
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
            <NotFound />
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
    [isPopup], // eslint-disable-line
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
