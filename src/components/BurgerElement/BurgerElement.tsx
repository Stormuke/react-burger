import { FC } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderStore } from 'services';
import { BurgerElementProps } from 'types/types';
import { useDrag, useDrop } from 'react-dnd';

import styles from './styles.module.scss';

export const BurgerElement: FC<BurgerElementProps> = ({ item, index }) => {
  /***************************************************
   *                   Селекторы
   ***************************************************/
  const { handleDelete, handleSort } = OrderStore.useAllOrderActions();

  /***************************************************
   *                     Хуки
   ***************************************************/
  const [, dragRef] = useDrag({
    type: 'element',
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: 'element',
    drop: (props: { index: number }) =>
      handleSort({ dragIndex: props.index, hoverIndex: index }),
    collect: (monitor) => ({
      isHovered: monitor.isOver(),
    }),
  });

  return (
    <div className={styles.element} ref={dropRef}>
      <div ref={dragRef} className={styles.element}>
        <button className={styles.elementButton}>
          <DragIcon type="secondary" />
        </button>

        <ConstructorElement
          handleClose={() => handleDelete(item.key)}
          key={item.key}
          text={item.name}
          thumbnail={item.image}
          price={item.price}
        />
      </div>
    </div>
  );
};
