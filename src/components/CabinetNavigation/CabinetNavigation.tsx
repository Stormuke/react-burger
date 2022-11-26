import type { ReactNode } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Navigation } from 'types/types';

import styles from './styles.module.scss';

export const CabinetNavigation = ({
  navigation,
}: {
  navigation: Navigation[];
}): ReactNode => {
  const { url } = useRouteMatch();
  return (
    <div>
      {navigation.map((item) => (
        <Link
          to={item.link}
          key={item.key}
          className={styles.button}
          onClick={item.onClick}
        >
          <p
            className={`text text_type_main-medium text_color_${
              url === item.link ? 'primary' : 'inactive'
            }`}
          >
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  );
};
