import type { FC, RefObject } from 'react';
import { BurgerIngredientsData } from 'types/types';
import { useEffect, useRef } from 'react';
import { useAppSelector } from 'services/rootReducer';
import { IngredientsStore } from 'services';
import { Card } from 'components/Card/Card';

import styles from './styles.module.scss';

interface IngredientsArray {
  data: BurgerIngredientsData[];
  key: string;
  ref: RefObject<HTMLDivElement>;
  title: string;
  type: string;
}

export const Cards: FC = () => {
  /***************************************************
   *                     Переменные
   ***************************************************/
  const bunRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const ingredientsArray: IngredientsArray[] = [];

  /***************************************************
   *                    Селекторы
   ***************************************************/
  const { response, tab } = useAppSelector(
    IngredientsStore.allIngredientsSelectors,
  );

  /***************************************************
   *              Пересборка ингредиентов
   ***************************************************/
  const ingredients = response.data.reduce(
    (acc, item) => {
      switch (item.type) {
        case 'bun':
          acc.buns.push(item);
          return acc;
        case 'sauce':
          acc.sauce.push(item);
          return acc;
        case 'main':
          acc.main.push(item);
          return acc;
        default:
          return acc;
      }
    },
    { buns: [], main: [], sauce: [] } as {
      buns: BurgerIngredientsData[];
      main: BurgerIngredientsData[];
      sauce: BurgerIngredientsData[];
    },
  );

  ingredientsArray.push(
    {
      title: 'Булки',
      data: ingredients.buns,
      ref: bunRef,
      key: '1',
      type: 'bun',
    },
    {
      title: 'Соусы',
      data: ingredients.sauce,
      ref: sauceRef,
      key: '2',
      type: 'sauce',
    },
    {
      title: 'Ингредиенты',
      data: ingredients.main,
      ref: mainRef,
      key: '3',
      type: 'main',
    },
  );

  /***************************************************
   *                     Сайды
   ***************************************************/
  useEffect(() => {
    if (tab === 'bun') {
      bunRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    if (tab === 'main') {
      mainRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    if (tab === 'sauce') {
      sauceRef.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, [tab]);

  return (
    <div className={styles.container}>
      {ingredientsArray.map((item) => (
        <div key={item.key} ref={item.ref}>
          <p className="text text_type_main-large mb-6">{item.title}</p>
          <div className={styles.containerItems}>
            {item.data.map((element) => (
              <Card key={element._id} item={element} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
