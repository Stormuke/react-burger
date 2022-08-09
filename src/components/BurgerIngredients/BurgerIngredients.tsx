import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';
import {

  BurgerIngredientsProps,
  Tabs,
} from 'types/types';

import styles from './styles.module.scss';

export const BurgerIngredients: FC<BurgerIngredientsProps> = ({
  children,
  activeTab,
}) => {
  const [active, setActive] = useState('bun');

  const setTab = useCallback(
    (value) => {
      setActive(value);
      activeTab(value);
    },
    [activeTab],
  );

  const tabs = useMemo<Tabs[]>(
    () => [
      {
        value: 'bun',
        onClick: (value) => setTab(value),
        active: active === 'bun',
        title: 'Булки',
      },
      {
        value: 'sauce',
        onClick: (value) => setTab(value),
        active: active === 'sauce',
        title: 'Соусы',
      },
      {
        value: 'main',
        onClick: (value) => setTab(value),
        active: active === 'main',
        title: 'Начинки',
      },
    ],
    [active, setTab],
  );

  return (
    <section className={styles.container}>
      <div className={styles.containerTab}>
        {tabs.map((item) => (
          <Tab
            value={item.value}
            onClick={item.onClick}
            active={item.active}
            key={item.value}
          >
            {item.title}
          </Tab>
        ))}
      </div>
      {children}
    </section>
  );
};
