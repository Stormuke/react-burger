import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { useAppSelector } from 'services/rootReducer';
import { OrderStore } from 'services';
import { useDrop } from 'react-dnd';
import { BurgerIngredientsData } from 'types/types';
import { v4 } from 'uuid';
import { BurgerElement } from 'components/BurgerElement/BurgerElement';

import styles from './styles.module.scss';
import { EmptyConstructor } from '../EmptyConstructor/EmptyConstructor';

export const BurgerConstructor: FC = () => {
  /***************************************************
   *                   Стейты                        *
   ***************************************************/
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  /*****************************************************
   *                   Экшены                         *
   ***************************************************/
  const { handlePostOrder, handleDrop, handleReset } =
    OrderStore.useAllOrderActions();

  /*****************************************************
   *                   Селекторы                      *
   ***************************************************/
  const { isPending, order } = useAppSelector(OrderStore.allOrderSelectors);

  /*****************************************************
   *                   Сайды                          *
   ***************************************************/
  useEffect(() => {
    if (isPending) {
      setIsPopupOpen(true);
    }
  }, [isPending]);

  /*****************************************************
   *                   Хуки                           *
   ***************************************************/
  const [, dropTarget] = useDrop({
    accept: 'item',
    drop: (obj: { item: BurgerIngredientsData }) =>
      handleDrop({ ...obj.item, key: v4() }),
  });

  return (
    <section className={styles.container} ref={dropTarget}>
      {order.length === 0 ? (
        <EmptyConstructor />
      ) : (
        <>
          <div className={styles.containerElement}>
            <ConstructorElement
              text={`${order[0].name} (Верх)`}
              thumbnail={order[0].image}
              price={order[0].price}
              type="top"
              isLocked
            />
          </div>
          <div className={styles.containerItems}>
            {order.map(
              (item, index) =>
                item.type !== 'bun' && (
                  <BurgerElement item={item} index={index} key={item.key} />
                ),
            )}
          </div>
          <div className={styles.containerElement}>
            <ConstructorElement
              text={`${order[0].name} (Низ)`}
              thumbnail={order[0].image}
              price={order[0].price}
              type="bottom"
              isLocked
            />
          </div>

          <div className={styles.containerCheckout}>
            <div className={styles.containerCheckoutPrice}>
              <p className="text text_type_digits-medium">
                {order.reduce(
                  (acc, item) =>
                    item.type === 'bun' ? acc + 0 : acc + item.price,
                  0,
                ) +
                  order[0].price * 2}
              </p>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              onClick={() =>
                handlePostOrder({
                  endpoint: 'orders',
                  body: {
                    ingredients: order.map((item) => item._id),
                  },
                })
              }
            >
              Оформить заказ
            </Button>
          </div>

          <Modal
            isOpened={isPopupOpen}
            onClose={() => {
              handleReset();
              setIsPopupOpen(false);
            }}
            title=""
          >
            <OrderDetails />
          </Modal>
        </>
      )}
    </section>
  );
};
