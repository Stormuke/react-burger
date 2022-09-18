import { FC } from 'react';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './styles.module.scss';

export const EmptyConstructor: FC = () => (
  <div className={styles.empty}>
    <BurgerIcon type="primary" />
    <p className="text text_type_main-medium text_color_primary">
      Начните перетаскивать ингредиенты в эту область
    </p>
  </div>
);
