import { ReactElement } from 'react';

/* Моковые данные ингредиентов */
export interface BurgerIngredientsData {
  __v: number;
  /** Уникальный айди **/
  _id: string;
  /** Калорийность **/
  calories: number;
  carbohydrates: number;
  /** Жиры **/
  fat: number;
  /** Маленькая картинка ингредиента **/
  image: string;
  /** Полная картинка ингредиента **/
  image_large: string;
  /** Мобильная картинка ингредиента **/
  image_mobile: string;
  /** Название ингридиента **/
  name: string;
  /** Стоимость ингридиента **/
  price: number;
  /** Количество протеинов **/
  proteins: number;
  /** Тип ингредиента **/
  type: string;
}

/* Пропсы компонента карточек ингредиентов */
export interface CardsProps {
  /** Массив карточек для отрисовки **/
  cards: BurgerIngredientsData[];

}

/* Пропсы компонента ингредиенты */
export interface BurgerIngredientsProps {
  /** Колбек для переключения табов, содержит в себе значение для корректной
   * работы, а так же фильтрации массива моков **/
  activeTab: (value: string) => void;
}

/* Пропсы компонента конструктора заказов */
export interface BurgerConstructorProps {
  /** Массив ингредиентов **/
  ingredients: BurgerIngredientsData[];
}

/* Табы */
export interface Tabs {
  /** Состояние таба, проверяется по велью активного таба **/
  active: boolean;
  /** Колбек переключения, значение берется из ключа велью **/
  onClick: (value: string) => void;
  /** Название таба **/
  title: string;
  /** Значение, нужно для корректной работы табов **/
  value: string;
}

/* Кнопки хедера */
export interface HeaderButton {
  /** Иконка **/
  element: ReactElement;
  /** Ключ **/
  key: string;
  /** Название кнопки **/
  title: string;
}
