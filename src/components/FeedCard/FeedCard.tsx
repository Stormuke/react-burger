import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import type { FC } from 'react';
import type { FeedCardData } from 'types/types';
import classNames from 'classnames';
import { dateParser } from 'utils/dateParser';
import { Link, useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

export const FeedCard: FC<FeedCardData> = ({
  orderNumber,
  details,
  date,
  title,
  price,
  status,
}) => {
  const location = useLocation();

  return (
    <Link
      className={styles.card}
      to={{
        pathname: `${location.pathname}/${orderNumber?.replace('# ', '')}`,
        state: { orderNumber, isPopup: true },
      }}
      key={orderNumber}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardContentInfo}>
          <p className="text text_type_digits-default">{orderNumber}</p>
          <p className="text text_type_main-default text_color_inactive">
            {dateParser(date)}
          </p>
        </div>
        <p
          className={classNames(
            'text text_type_main-small',
            status === 'done' && styles.cardContentStatus,
          )}
        >
          {status === 'done' ? 'Готов' : 'В процессе'}
        </p>
      </div>

      <p className="text text_type_main-medium">{title}</p>

      <div className={styles.cardContentInfo}>
        <div className={styles.cardImages}>
          {details.slice(0, 6).map((item, index) => (
            <img
              style={{ zIndex: details.length - index }}
              src={item.image}
              alt={item.name}
              key={item.id}
              className={classNames(
                styles.cardImagesImage,
                details.length >= 5 && styles.cardImagesImageOverflow,
              )}
            />
          ))}
          {details.length > 5 && (
            <p
              className={classNames(
                'text text_type_main-small',
                styles.cardImagesImageText,
              )}
            >
              + {details.slice(5, details.length).length}
            </p>
          )}
        </div>
        <div className={styles.cardCounter}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
