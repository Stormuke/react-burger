import type { FC } from 'react';
import { Suspense } from 'react';
import Routing from '../pages'
import { withProviders } from './providers';
import styles from './styles.module.scss';

export const App: FC = () => (
  <main className={styles.App}>
    <Suspense fallback='...Загрузка'>
        <Routing />
    </Suspense>
  </main>
);

export default withProviders(App);
