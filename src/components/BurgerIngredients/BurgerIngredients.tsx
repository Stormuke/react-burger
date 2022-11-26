import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import type { FC } from 'react';
import { useMemo } from 'react';
import { IngredientsStore } from 'services';
import { Tabs } from 'types/types';
import { useAppSelector } from 'services/rootReducer';
import { useCreateSliceActions } from 'utils/useCreateSliceActions';

import styles from './styles.module.scss';

export const BurgerIngredients: FC = ({ children }) => {
  /***************************************************
   *                     Экшены
   ***************************************************/
  const { handleTabSwitch } = useCreateSliceActions(
    IngredientsStore.slice.actions,
  );

  /***************************************************
   *                     Селекторы
   ***************************************************/
  const { tab } = useAppSelector(IngredientsStore.allIngredientsSelectors);

  /***************************************************
   *                    Мемоизация
   ***************************************************/
  const tabs = useMemo<Tabs[]>(
    () => [
      {
        value: 'bun',
        onClick: (value) => handleTabSwitch(value),
        active: tab === 'bun',
        title: 'Булки',
        key: '1',
      },
      {
        value: 'sauce',
        onClick: (value) => handleTabSwitch(value),
        active: tab === 'sauce',
        title: 'Соусы',
        key: '2',
      },
      {
        value: 'main',
        onClick: (value) => handleTabSwitch(value),
        active: tab === 'main',
        title: 'Начинки',
        key: '3',
      },
    ],
    // Отключил линтер, колбеки не нужны в зависимостях
    // eslint-disable-next-line
    [tab],
  );

  return (
    <section className={styles.container}>
      <div className={styles.containerTab}>
        {tabs.map((item) => (
          <Tab
            value={item.value}
            onClick={item.onClick}
            active={item.active}
            key={item.key}
          >
            {item.title}
          </Tab>
        ))}
      </div>
      {children}
    </section>
  );
};
