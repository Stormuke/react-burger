import type { FC } from 'react';

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { CardProps } from 'types/types';
import { OrderStore } from 'services';
import { useAppSelector } from 'services/rootReducer';
import { useCallback } from 'react';

import styles from './styles.module.scss';

export const Card: FC<CardProps> = ({ item, setIngredient, onClick }) => {
  /*****************************************************
   *                   Селекторы
   ***************************************************/
  const { order } = useAppSelector(OrderStore.allOrderSelectors);

  const count = order.filter((i) => i.name === item.name).length;

  /*****************************************************
   *                     Хуки
   ***************************************************/
  const [{ opacity }, drag] = useDrag({
    type: 'item',
    item: { item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const handleOpenPopup = useCallback(() => {
    onClick();
    setIngredient(item);
    // Отключил линтер, колбеки не нужны в зависимостях
    // eslint-disable-next-line
  }, [item]);

  return (
    <div
      style={{ opacity }}
      className={styles.element}
      onClick={handleOpenPopup}
    >
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
  );
};
