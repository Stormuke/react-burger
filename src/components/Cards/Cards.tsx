import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import type { FC } from 'react';
import { BurgerIngredientsData, CardsProps } from 'types/types';
import { useState } from 'react';
import { PopupWithIngredientsDetails } from '../PopupWithIgredientsDetails/PopupWithIngredientsDetails';

import styles from './styles.module.scss';

export const Cards: FC<CardsProps> = ({ cards }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [card, setCard] = useState<BurgerIngredientsData | null>(null)

  return (
    <div className={styles.container}>
      {cards.map((item) => (
        <div
          className={styles.containerElement}
          onClick={() => {
            setIsPopupOpen(true);
            setCard(item)
          }}
          key={item._id}
        >
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

          <p className="text text_type_main-default ">{item.name}</p>
        </div>
      ))}

      <PopupWithIngredientsDetails
        isOpened={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        card={card}
        title='Детали ингредиента'
      />
    </div>
  );
};
