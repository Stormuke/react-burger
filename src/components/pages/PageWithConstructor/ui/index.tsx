import type { FC } from 'react';
import { useState } from 'react';
import { AppHeader } from 'components/widgets/AppHeader';

import { Cards } from 'components/widgets/Cards';
import { BurgerConstructor } from 'components/features/BurgerConstructor';
import { BurgerIngredients } from 'components/features/BurgerIngredients';
import { BurgerConstructorModel } from '..';
import styles from './styles.module.scss';

export const PageWithConstructor: FC = () => {
  const [active, setActive] = useState('bun');

  const { burgerIngredients } = BurgerConstructorModel;

  const cards = burgerIngredients.filter((i) => i.type === active);

  return (
    <section className={styles.page}>
      <AppHeader />
      <div className={styles.pageContent}>
        <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
        <div className={styles.pageContainer}>
          <BurgerConstructor activeTab={setActive}>
            <Cards cards={cards} />
          </BurgerConstructor>
          <BurgerIngredients ingredients={burgerIngredients} />
        </div>
      </div>
    </section>
  );
};
