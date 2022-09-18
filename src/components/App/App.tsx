import { withProviders } from 'utils/withProviders';
import type { FC } from 'react';
import { lazy, Suspense } from 'react';
import { Loader } from 'utils/ui/Loader/Loader';

import styles from './styles.module.scss';

const Routing = lazy(() => import('components/Routing/Routing'));

export const App: FC = () => (
  <main className={styles.App}>
    <Suspense fallback={<Loader />}>
      <Routing />
    </Suspense>
  </main>
);

export default withProviders(App);
