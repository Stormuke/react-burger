import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import type { FC } from 'react';
import { CardsProps } from 'components/widgets/Cards';
import styles from './styles.module.scss';

export const Cards: FC<CardsProps> = ({ cards }) => (
  <div className={styles.container}>
    {cards.map((item) => (
      <div className={styles.containerElement} key={item._id}>
        <Counter count={1} size="default" />
        <img
          className={styles.containerElementImage}
          src={item.image_large}
          alt={item.name}
        />

        <div className={styles.containerElementPrice}>
          <p className="text text_type_digits-default">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>

        <p className="text text_type_main-default ">
          {item.name}
        </p>

      </div>
    ))}
  </div>
);
