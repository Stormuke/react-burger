import type { ReactElement } from 'react';
import { useMemo } from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { PageWithConstructor } from '../PageWithConstructor/PageWithConstructor';

const Routing = (): ReactElement | null => {
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