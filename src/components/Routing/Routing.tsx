import type { ReactElement } from 'react';
import { lazy, useEffect, useMemo } from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { IngredientsStore } from 'services';

const PageWithConstructor = lazy(
  () => import('../PageWithConstructor/PageWithConstructor'),
);

const Routing = (): ReactElement | null => {
  const { handleGetIngredients } = IngredientsStore.useAllIngredientsActions();

  useEffect(() => {
    handleGetIngredients('ingredients');
    // eslint-disable-next-line
  }, []);

  const routes = useMemo<RouteObject[]>(
    () => [
      {
        path: '/',
        element: <PageWithConstructor />,
      },
    ],
    [],
  );

  return useRoutes(routes);
};

export default Routing;
