import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { BurgerConstructor } from 'components/BurgerConstructor/BurgerConstructor';
import { Cards } from 'components/Cards/Cards';
import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import styles from './styles.module.scss';
import { BurgerIngredientsData } from '../../types/types';
import { BASE_URL } from '../../utils/constants';

const PageWithConstructor: FC = () => {
  const [isPending, setIsPending] = useState(true)
  const [active, setActive] = useState('bun');
  const [ingredients, setIngredients] = useState<BurgerIngredientsData[]>([])

  useEffect(() => {
    setIsPending(true);
    fetch(BASE_URL)
      .then(res => res.ok && res.json())
      .then(res => setIngredients(res.data))
      .finally(() => setIsPending(false))
  }, [])

  const cards = ingredients.filter((i) => i.type === active);

  return (
    isPending ? <p className="text text_type_main-large mt-40 ml-40">...Загрузка</p> :
    <section className={styles.page}>
      <AppHeader />
      <div className={styles.pageContent}>
        <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
        <div className={styles.pageContainer}>
          <BurgerIngredients  activeTab={setActive}>
            <Cards cards={cards} />
          </BurgerIngredients>
          <BurgerConstructor  ingredients={ingredients} />
        </div>
      </div>
    </section>
  );
};

export default PageWithConstructor;
