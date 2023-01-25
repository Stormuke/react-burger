import type { FC } from 'react';
import { useMemo } from 'react';
import { BurgerIngredientsData, IngredientNutrition } from 'types/types';
import { useAppSelector } from 'services/rootReducer';
import { IngredientsStore } from 'services';
import { useLocation } from 'react-router-dom';
import { NotFound } from 'pages/NotFound/NotFound';

import styles from './styles.module.scss';

export const IngredientsDetails: FC = () => {
  const location = useLocation();

  /*****************************************************
   *                     Селекторы
   ***************************************************/
  const { response } = useAppSelector(IngredientsStore.allIngredientsSelectors);

  /*****************************************************
   *                     Мемоизация
   ***************************************************/
  const ingredientIndex = useMemo<number>(
    () =>
      response.data.findIndex((i) => i._id === location.pathname.split('/')[2]),
    [response.data, location],
  );

  const currentCard = useMemo<BurgerIngredientsData>(
    () => response.data[ingredientIndex],
    [response.data, ingredientIndex],
  );

  const description = useMemo<IngredientNutrition[]>(
    () => [
      { title: 'Калории,ккал', value: currentCard?.calories, key: '1' },
      { title: 'Белки, г', value: currentCard?.proteins, key: '2' },
      { title: 'Жиры, г', value: currentCard?.fat, key: '3' },
      { title: 'Углеводы, г', value: currentCard?.carbohydrates, key: '4' },
    ],
    [currentCard],
  );

  /*****************************************************
   *                     UI
   ***************************************************/
  return currentCard ? (
    <div className={styles.content}>
      <img
        src={currentCard.image_large}
        alt={currentCard.name}
        className={styles.contentImage}
      />
      <p className="text text_type_main-medium mt-4 mb-8" data-test="ingredientName">{currentCard.name}</p>
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
  ) : (
    <NotFound />
  );
};
