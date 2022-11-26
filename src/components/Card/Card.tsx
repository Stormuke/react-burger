import type { FC } from 'react';

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { CardProps } from 'types/types';
import { OrderStore } from 'services';
import { useAppSelector } from 'services/rootReducer';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export const Card: FC<CardProps> = ({ item }) => {
  const ingredientId = item._id;

  /*****************************************************
   *                   Селекторы
   ***************************************************/
  const { order } = useAppSelector(OrderStore.allOrderSelectors);

  const count = order.filter((i) => i.name === item.name).length;

  /*****************************************************
   *                     Колбеки
   ***************************************************/
  const [{ opacity }, drag] = useDrag({
    type: 'item',
    item: { item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  /*****************************************************
   *                     UI
   ***************************************************/
  return (
    <Link
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { isPopup: true },
      }}
      key={ingredientId}
    >
      <div style={{ opacity }} className={styles.element}>
        <Counter count={count} size="default" />
        <img
          ref={drag}
          className={styles.elementImage}
          src={item.image_large}
          alt={item.name}
        />

        <div className={styles.elementPrice}>
          <p className="text text_type_digits-default">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>

        <p className="text text_type_main-default ">{item.name}</p>
      </div>
    </Link>
  );
};
