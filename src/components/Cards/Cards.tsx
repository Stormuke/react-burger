import type { FC } from 'react';
import { BurgerIngredientsData } from 'types/types';
import { useState } from 'react';
import { IngredientsDetails } from 'components/IgredientsDetails/IngredientsDetails';
import { Modal } from 'components/Modal/Modal';
import { useAppSelector } from 'services/rootReducer';
import { IngredientsStore } from 'services';
import { Card } from 'components/Card/Card';
import { v4 } from 'uuid';

import styles from './styles.module.scss';

export const Cards: FC = () => {
  /***************************************************
   *                     Стейты
   ***************************************************/
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [card, setCard] = useState<BurgerIngredientsData | null>(null);

  /***************************************************
   *                    Селекторы
   ***************************************************/
  const { response, tab } = useAppSelector(
    IngredientsStore.allIngredientsSelectors,
  );
  const cards = response.data.filter((i) => i.type === tab);

  return (
    <div className={styles.container}>
      {cards.map((item) => (
        <Card
          key={v4()}
          item={item}
          onClick={() => setIsPopupOpen(true)}
          setIngredient={setCard}
        />
      ))}

      <Modal
        isOpened={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Детали ингредиента"
      >
        <IngredientsDetails card={card} />
      </Modal>
    </div>
  );
};
