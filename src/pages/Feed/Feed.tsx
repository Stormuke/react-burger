import type { FC } from 'react';
import { FeedList } from 'components/FeedList/FeedList';
import { FeedInfo } from 'components/FeedInfo/FeedInfo';
import { useAppSelector } from 'services/rootReducer';
import { FeedStore } from 'services';

import styles from './styles.module.scss';

export const Feed: FC = () => {
  const feed = useAppSelector(FeedStore.selectors.feedSelector);

  return (
    <section className={styles.feed}>
      <p className="text text_type_main-large pb-5 pt-10">Лента заказов</p>
      <div className={styles.feedContent}>
        <FeedList feedArray={feed.orders.orders} />
        <FeedInfo />
      </div>
    </section>
  );
};

export default Feed;
