import type { FC } from 'react';
import { FeedStore } from 'services';
import { useAppSelector } from 'services/rootReducer';
import classNames from 'classnames';
import type { FeedOrder } from 'types/types';

import styles from './styles.module.scss';

export const FeedInfo: FC = () => {
  /*****************************************************
   *                     Селекторы
   ***************************************************/
  const feed = useAppSelector(FeedStore.selectors.feedSelector);

  /*****************************************************
   *                    Парсеры
   ***************************************************/
  const sortedOrders = feed.orders.orders.reduce(
    (acc, item) => {
      if (item.status === 'done') {
        acc.done.array.push(item);
      } else {
        acc.inProgress.array.push(item);
      }

      return acc;
    },
    {
      done: { title: 'Готовы:', array: [] as FeedOrder[] },
      inProgress: { title: 'В работе:', array: [] as FeedOrder[] },
    },
  );

  return (
    <div className={styles.content}>
      <div className={styles.info}>
        {Object.entries(sortedOrders).map(([key, value]) => (
          <div className={styles.infoContent} key={key}>
            <p className="text text_type_main-medium mb-6">{value.title}</p>
            <div className={styles.infoNumbers}>
              {value.array.map(({ number }) => (
                <p
                  key={number}
                  className={classNames(
                    'text text_type_digits-default',
                    key === 'done' && styles.infoNumber,
                  )}
                >
                  {number}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="text text_type_main-large">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{feed.orders.total}</p>
      </div>
      <div>
        <p className="text text_type_main-large">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{feed.orders.totalToday}</p>
      </div>
    </div>
  );
};
