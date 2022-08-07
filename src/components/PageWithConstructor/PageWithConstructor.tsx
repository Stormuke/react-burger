import type { FC } from 'react';
import { useState } from 'react';

import { BurgerConstructor } from 'components/BurgerConstructor/BurgerConstructor';
import { Cards } from 'components/Cards/Cards';
import { burgerIngredients } from '../../utils/burgerIngredients';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import styles from './styles.module.scss';

export const PageWithConstructor: FC = () => {
  const [active, setActive] = useState('bun');

  const cards = burgerIngredients.filter((i) => i.type === active);

  return (
    <section className={styles.page}>
      <AppHeader />
      <div className={styles.pageContent}>
        <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
        <div className={styles.pageContainer}>
          <BurgerIngredients  activeTab={setActive}>
            <Cards cards={cards} />
          </BurgerIngredients>
          <BurgerConstructor  ingredients={burgerIngredients} />
        </div>
      </div>
    </section>
  );
};
