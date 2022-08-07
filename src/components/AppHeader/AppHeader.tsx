import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo } from 'react';
import { HeaderButton } from 'types/types';

import styles from './styles.module.scss';

export const AppHeader: FC = () => {
  const buttons = useMemo<HeaderButton[]>(
    () => [
      { element: <BurgerIcon type="primary" />, title: 'Конструктор', key: '1' },
      { element: <ListIcon type="secondary" />, title: 'Лента заказов', key: '2' },
    ],
    [],
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContainerButtons}>
          {buttons.map((item) => (
            <div
              className={styles.headerContainerButtonsElement}
              key={item.key}
            >
              {item.element}
              <p className={`text text_type_main-default text_color_${item.key === '1' ? 'primary' : 'inactive'}`}>
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.headerLogo}>
          <Logo />
        </div>


        <div className={styles.headerContainerButtonsElement}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">
            Личный кабинет
          </p>
        </div>

      </div>
    </header>
  );
};
