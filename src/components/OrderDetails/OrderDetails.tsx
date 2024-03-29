import type { FC } from 'react';
import done from 'images/done.svg';
import { OrderStore } from 'services';
import { useAppSelector } from 'services/rootReducer';
import { Loader } from 'utils/ui/Loader/Loader';

import styles from './styles.module.scss';


export const OrderDetails: FC = () => {
  const orders = useAppSelector(OrderStore.dataSelector);

  return orders.isPending ? (
    <Loader className={styles.spinner} />
  ) : (
    <div className={styles.content}>
      <p className="text text_type_digits-large" data-test="orderNumber">{orders.response.order.number}</p>
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <img src={done} alt="Заказ готов" className={styles.contentImage} />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
