import type { FC } from 'react';
import { IngredientsStore } from 'services';
import { useAppSelector } from 'services/rootReducer';
import type {
  FeedListProps,
  ParsedFeed,
} from 'types/types';
import classNames from 'classnames';
import { orderDetailsParser } from 'utils/orderDetailsParser';
import { FeedCard } from 'components/FeedCard/FeedCard';

import styles from './styles.module.scss';

export const FeedList: FC<FeedListProps> = ({ feedArray, isFull }) => {
  /*****************************************************
   *                     Селекторы
   ***************************************************/
  const ingredient = useAppSelector(IngredientsStore.allIngredientsSelectors);

  /*****************************************************
   *                     Парсеры
   ***************************************************/
  const parsedFeed = feedArray.reduce((acc, item) => {
    const order = orderDetailsParser(
      item.ingredients,
      ingredient.response.data,
    );

    const data = {
      totalPrice: order.totalPrice,
      array: order.array,
      date: item.updatedAt,
      orderNumber: `# ${item.number}`,
      status: item.status,
      title: item.name,
    };

    return [...acc, data];
  }, [] as ParsedFeed[]);

  /*****************************************************
   *                     UI
   ***************************************************/
  return (
    <div className={classNames(styles.list, isFull && styles.listFull)}>
      {parsedFeed.map((item) => (
        <FeedCard
          key={item.date}
          date={item.date}
          details={item.array}
          orderNumber={item.orderNumber}
          price={item.totalPrice}
          status={item.status}
          title={item.title}
        />
      ))}
    </div>
  );
};
