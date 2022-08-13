import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import type { FC } from 'react';
import { BurgerConstructorProps } from 'types/types';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';

import styles from './styles.module.scss';

export const BurgerConstructor: FC<BurgerConstructorProps> = ({
  ingredients,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section className={styles.container}>
      <div className={styles.containerElement}>
        <ConstructorElement
          text={`${ingredients[0].name} (Верх)`}
          thumbnail={ingredients[0].image}
          price={ingredients[0].price}
          type="top"
          isLocked
        />
      </div>
      <div className={styles.containerItems}>
        {ingredients.map(
          (item) =>
            item.type !== 'bun' && (
              <div className={styles.containerItemsItem} key={item._id}>
                <DragIcon type="secondary" />
                <ConstructorElement
                  key={item._id}
                  text={item.name}
                  thumbnail={item.image}
                  price={item.price}
                />
              </div>
            ),
        )}
      </div>
      <div className={styles.containerElement}>
        <ConstructorElement
          text={`${ingredients[0].name} (Низ)`}
          thumbnail={ingredients[0].image}
          price={ingredients[0].price}
          type="bottom"
          isLocked
        />
      </div>

      <div className={styles.containerCheckout}>
        <div className={styles.containerCheckoutPrice}>
          <p className="text text_type_digits-medium">
            {ingredients.reduce((acc, item) => acc + item.price, 0)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={() => setIsPopupOpen(true)}>Оформить заказ</Button>
      </div>

      <Modal
        isOpened={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title=""
      >
        <OrderDetails />
      </Modal>
    </section>
  );
};
