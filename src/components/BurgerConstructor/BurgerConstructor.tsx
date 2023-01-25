import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import type { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { useAppDispatch, useAppSelector } from 'services/rootReducer';
import { OrderStore } from 'services';
import { useDrop } from 'react-dnd';
import { BurgerIngredientsData, OrderRequest } from 'types/types';
import { v4 } from 'uuid';
import { BurgerElement } from 'components/BurgerElement/BurgerElement';
import { getCookie } from 'utils/cookie';
import { EmptyConstructor } from 'components/EmptyConstructor/EmptyConstructor';

import styles from './styles.module.scss';
import { useCreateSliceActions } from '../../utils/useCreateSliceActions';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory();
  const accessToken = getCookie('accessToken');

  /***************************************************
   *                   Стейты                        *
   ***************************************************/
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  /*****************************************************
   *                   Экшены                         *
   ***************************************************/
  const { handleDrop, reset } =
    useCreateSliceActions(OrderStore.reducer.slice.actions);

  /*****************************************************
   *                   Селекторы                      *
   ***************************************************/
  const orders = useAppSelector(OrderStore.dataSelector);

  /*****************************************************
   *                   Колбеки                        *
   ***************************************************/
  const handlePostOrder = (body: OrderRequest): void => {
    dispatch(OrderStore.postOrderThunk(body))
  }

  const handleOrder = (): void =>
    accessToken
      ? handlePostOrder({
          endpoint: 'orders',
          body: {
            ingredients: orders.order.map((item) => item._id),
          },
          cookie: accessToken,
        })
      : history.replace('/login');

  /*****************************************************
   *                   Сайды                          *
   ***************************************************/
  useEffect(() => {
    if (orders.isPending) {
      setIsPopupOpen(true);
    }
  }, [orders.isPending]);

  /*****************************************************
   *                   Хуки                           *
   ***************************************************/
  const [, dropTarget] = useDrop({
    accept: 'item',
    drop: (obj: { item: BurgerIngredientsData }) =>
      handleDrop({ ...obj.item, key: v4() }),
  });

  return (
    <section className={styles.container} ref={dropTarget} data-test='burgerConstructor'>
      {orders.order.length === 0 ? (
        <EmptyConstructor />
      ) : (
        <>
          <div className={styles.containerElement}>
            <ConstructorElement
              text={`${orders.order[0].name} (Верх)`}
              thumbnail={orders.order[0].image}
              price={orders.order[0].price}
              type="top"
              isLocked
            />
          </div>
          <div className={styles.containerItems}>
            {orders.order.map(
              (item, index) =>
                item.type !== 'bun' && (
                  <BurgerElement item={item} index={index} key={item.key} />
                ),
            )}
          </div>
          <div className={styles.containerElement}>
            <ConstructorElement
              text={`${orders.order[0].name} (Низ)`}
              thumbnail={orders.order[0].image}
              price={orders.order[0].price}
              type="bottom"
              isLocked
            />
          </div>

          <div className={styles.containerCheckout}>
            <div className={styles.containerCheckoutPrice}>
              <p className="text text_type_digits-medium">
                {orders.order.reduce(
                  (acc, item) =>
                    item.type === 'bun' ? acc + 0 : acc + item.price,
                  0,
                ) +
                  orders.order[0].price * 2}
              </p>
              <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" onClick={handleOrder}>
              Оформить заказ
            </Button>
          </div>

          <Modal
            isOpened={isPopupOpen}
            onClose={() => {
              reset();
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
