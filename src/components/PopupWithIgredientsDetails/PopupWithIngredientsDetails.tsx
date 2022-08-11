import type { FC } from 'react';
import { useMemo } from 'react';
import {
  IngredientNutrition,
  PopupWithIngredientsDetailsProps,
} from 'types/types';
import { Modal } from '../Modal/Modal';

import styles from './styles.module.scss';

export const PopupWithIngredientsDetails: FC<
  PopupWithIngredientsDetailsProps
> = ({ isOpened, onClose, card, title }) => {
  const description = useMemo<IngredientNutrition[]>(
    () => [
      { title: 'Калории,ккал', value: card?.calories, key: '1' },
      { title: 'Белки, г', value: card?.proteins, key: '2' },
      { title: 'Жиры, г', value: card?.fat, key: '3'},
      { title: 'Углеводы, г', value: card?.carbohydrates, key: '4'},
    ],
    [card],
  );

  return (
    <Modal isOpened={isOpened} onClose={onClose} title={title}>
      {card && (
        <div className={styles.content}>
          <img
            src={card.image_large}
            alt={card.name}
            className={styles.contentImage}
          />
          <p className="text text_type_main-medium mt-4 mb-8">{card.name}</p>
          <div className={styles.contentDescription}>
            {description.map((item) => (
              <div className={styles.contentDescriptionItem} key={item.key}>
                <p className="text text_type_main-default text_color_inactive">
                  {item.title}
                </p>
                <p className="text text_type_main-default text_color_inactive">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};
