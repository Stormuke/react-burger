import type { FC } from 'react';

import { BurgerConstructor } from 'components/BurgerConstructor/BurgerConstructor';
import { Cards } from 'components/Cards/Cards';
import { BurgerIngredients } from 'components/BurgerIngredients/BurgerIngredients';

import styles from './styles.module.scss';

const Constructor: FC = () => (
  <section className={styles.page}>
    <div className={styles.pageContent}>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div className={styles.pageContainer}>
        <BurgerIngredients>
          <Cards />
        </BurgerIngredients>
        <BurgerConstructor />
      </div>
    </div>
  </section>
);

export default Constructor;
