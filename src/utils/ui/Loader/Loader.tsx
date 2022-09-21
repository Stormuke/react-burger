import type { FC } from 'react';
import classNames from 'classnames';
import { Spinner } from '../Spinner/Spinner';

import styles from './styles.module.scss';

interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ className }) => (
  <div className={classNames(styles.loader, className)}>
    <Spinner />
    <p className="text text_type_main-large mt-40 ml-40">...Загрузка</p>
  </div>
);
