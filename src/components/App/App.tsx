import Routing from 'components/Routing/Routing';
import { withProviders } from 'components/WithRouter/withRouter';
import type { FC } from 'react';
import { Suspense } from 'react';

import styles from './styles.module.scss';

export const App: FC = () => (
  <main className={styles.App}>
    <Suspense fallback='...Загрузка'>
        <Routing />
    </Suspense>
  </main>
);

export default withProviders(App);
