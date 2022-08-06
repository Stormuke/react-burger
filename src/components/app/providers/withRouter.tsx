import { Suspense } from 'react';
import type { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (component: () => FC) => () =>
  (
    <BrowserRouter>
        <Suspense fallback='...Загрузка'>{component()}</Suspense>
    </BrowserRouter>
  );
