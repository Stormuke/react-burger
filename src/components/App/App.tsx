import { withProviders } from 'components/WithRouter/withRouter';
import type { FC } from 'react';
import { lazy, Suspense } from 'react';

import styles from './styles.module.scss';

const Routing = lazy(() => import('components/Routing/Routing'))

export const App: FC = () => (
  <main className={styles.App}>
    <Suspense fallback={<p>...Загрузка</p>}>
      <Routing />
    </Suspense>
  </main>
);

export default withProviders(App);
