import { Suspense } from 'react';
import type { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from '../ui/Loader/Loader';

export const withRouter = (component: () => FC) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>{component()}</Suspense>
    </BrowserRouter>
  );
