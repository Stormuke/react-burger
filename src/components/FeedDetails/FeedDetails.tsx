import type { FC } from 'react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from 'services/rootReducer';
import { IngredientsStore } from 'services';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import type { FeedDetailsProps } from 'types/types';
import { dateParser } from 'utils/dateParser';
import { orderDetailsParser } from 'utils/orderDetailsParser';
import { Spinner } from 'utils/ui/Spinner/Spinner';

import styles from './styles.module.scss';

export const FeedDetails: FC<FeedDetailsProps> = ({ feedArray }) => {
  const location = useLocation<{ isPopup: boolean; orderNumber: string }>();
  const splitedLocation = location.pathname.split('/');

  const isPopup = location.state && location.state.isPopup;
  const orderNumber = location.state
    ? location.state.orderNumber
    : splitedLocation[splitedLocation.length - 1];

  /*****************************************************
   *                     Селекторы
   ***************************************************/

  const ingredients = useAppSelector(IngredientsStore.allIngredientsSelectors);
  /*****************************************************
   *                     Мемоизация
   ***************************************************/

  const parsedNumber = useMemo<number>(
    () => Number(orderNumber.replace('# ', '')),
    [orderNumber],
  );
  const orderIndex = useMemo<number>(
    () =>
      feedArray.length !== 0
        ? feedArray.findIndex((i) => i.number === parsedNumber)
        : 0,
    [feedArray, parsedNumber],
  );
  const currentOrder = feedArray[orderIndex];

  const orderDetails = useMemo(
    () =>
      !ingredients.isPending && currentOrder
        ? orderDetailsParser(
            currentOrder.ingredients,
            ingredients.response.data,
          )
        : { totalPrice: 0, array: [] },
    [currentOrder, ingredients],
  );

  /*****************************************************
   *                       UI
   ***************************************************/
  return ingredients.isPending ? (
    <Spinner />
  ) : (
    <div className={classNames(styles.details, !isPopup && styles.detailsFull)}>
      <p
        className={classNames(
          'text text_type_digits-default',
          styles.detailsTitle,
        )}
      >
        {orderNumber}
      </p>
      <p className="text text_type_main-medium pb-3 pt-10">
        {currentOrder?.name}
      </p>
      <p className="text text_type_main-small pb-15">
        {currentOrder?.status === 'done' ? 'Выполнен' : 'Готовится'}
      </p>
      <p className="text text_type_main-medium pb-6">Состав:</p>

      <div className={classNames(styles.detailsContainer, 'pb-10')}>
        {orderDetails.array.map((item) => (
          <div key={item.id} className={styles.detailsItem}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.detailsImage}
            />
            <p
              className={classNames(
                'text text_type_main-small',
                styles.detailsName,
              )}
            >
              {item.name}
            </p>
            <div className={styles.detailsPrice}>
              <p className="text text_type_digits-default">
                {item.count} x {item.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.detailsFooter}>
        <p className="text text_type_main-default text_color_inactive">
          {dateParser(currentOrder?.updatedAt as string)}
        </p>
        <div className={styles.detailsPrice}>
          <p className="text text_type_digits-default">
            {orderDetails.totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
