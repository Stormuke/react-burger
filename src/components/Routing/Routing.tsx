import { lazy, useEffect, useMemo } from 'react';
import type { RouteProps } from 'react-router-dom';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { CabinetStore, IngredientsStore } from 'services';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from 'services/rootReducer';
import { getCookie } from 'utils/cookie';
import { useCreateSliceActions } from 'utils/useCreateSliceActions';
import { AppHeader } from '../AppHeader/AppHeader';
import { NotFound } from '../../pages/NotFound/NotFound';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import styles from '../../pages/Constructor/styles.module.scss';
import { IngredientsDetails } from '../IgredientsDetails/IngredientsDetails';
import { Modal } from '../Modal/Modal';

const Constructor = lazy(() => import('../../pages/Constructor/Constructor'));
const Cabinet = lazy(() => import('../../pages/Cabinet/Cabinet'));
const Auth = lazy(() => import('../../pages/Auth/Auth'));

type RoutingType = RouteProps & { protected: boolean };

const Routing = (): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const cookie = getCookie('accessToken');
  const location = useLocation<{
    isPopup: boolean;
  }>();
  const history = useHistory();
  const isPopup = location.state && location.state.isPopup;

  /*****************************************************
   *                     Экшены
   ***************************************************/
  const { handleInputsData } = useCreateSliceActions(
    CabinetStore.slice.actions,
  );

  /*****************************************************
   *                     Колбеки
   ***************************************************/

  const getUser = async (): Promise<void> => {
    const res = await dispatch(
      IngredientsStore.getUserDataThunk({
        url: 'auth/user',
        cookie: cookie as string,
      }),
    );

    const response = unwrapResult(res);

    if (response.success) {
      handleInputsData(response.user);
    }
  };

  const handleClose = (): void => {
    history.goBack();
  };

  /*****************************************************
   *                     Сайды
   ***************************************************/
  useEffect(() => {
    if (cookie) {
      getUser();
    }

    dispatch(IngredientsStore.getIngredientsThunk('ingredients'));

    // eslint-disable-next-line
  }, []);

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
