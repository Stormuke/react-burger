import type { FC } from 'react';

import styles from './styles.module.scss'

export const Spinner: FC = () => (
  <div className={styles.fancySpinner}>
    <div className={styles.fancySpinnerRing} />
    <div className={styles.fancySpinnerRing} />
    <div className={styles.fancySpinnerDot} />
  </div>
);
