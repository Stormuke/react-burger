import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'types/types';

import styles from './styles.module.scss';

export const AuthAndResetNavigation = (navigation: Navigation[]): ReactNode =>
  navigation.map((item) => (
    <div className={styles.container} key={item.key}>
      <p className="text text_type_main-default">{item.title}</p>
      <Link to={item.link}>{item.linkText}</Link>
    </div>
  ));
