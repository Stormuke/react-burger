import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { HeaderButton } from 'types/types';

import styles from './styles.module.scss';

export const AppHeader: FC = () => {
  const { url } = useRouteMatch();

  const buttons = useMemo<HeaderButton[]>(
    () => [
      {
        element: <BurgerIcon type={url === '/' ? 'primary' : 'secondary'} />,
        title: 'Конструктор',
        key: '1',
        route: '/',
      },
      {
        element: <ListIcon type={url === '/feed' ? 'primary' : 'secondary'} />,
        title: 'Лента заказов',
        key: '2',
        route: '/feed',
      },
    ],
    [url],
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContainerButtons}>
          {buttons.map((item) => (
            <Link to={item.route} key={item.key}>
              <div className={styles.headerContainerButtonsElement}>
                {item.element}
                <p
                  className={`text text_type_main-default text_color_${
                    url === item.route ? 'primary' : 'inactive'
                  }`}
                >
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.headerLogo}>
          <Logo />
        </div>

        <div className={styles.headerContainerButtonsElement}>
          <ProfileIcon
            type={url.split('/')[1] === 'profile' ? 'primary' : 'secondary'}
          />
          <Link to="/profile">
            <p
              className={`text text_type_main-default text_color_${
                url.split('/')[1] === 'profile' ? 'primary' : 'inactive'
              }`}
            >
              Личный кабинет
            </p>{' '}
          </Link>
        </div>
      </div>
    </header>
  );
};
