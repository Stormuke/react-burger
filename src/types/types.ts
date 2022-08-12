import { ReactElement } from 'react';

/* Данные ингредиентов */
export interface BurgerIngredientsData {
  __v: number;
  /** Уникальный айди **/
  _id: string;
  /** Калорийность **/
  calories: number;
  /** Углеводы **/
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

/***********************************************
 *              Пропсы компонентов
 **********************************************/

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

/* Пропсы компонента модального окна */
export interface ModalProps {
  /** Статус попапа **/
  isOpened: boolean;
  /** Колбек закрытия **/
  onClose: Callback;
  /** Заголовок **/
  title: string;
}

/* Пропсы компонента оверлея модального окна */
export interface ModalOverlayProps {
  /** Колбек закрытия **/
  onClose: Callback;
}

/* Пропсы компонента попапа с детальным описанием ингредиента */
export interface IngredientsDetailsProps {
  card: BurgerIngredientsData | null;
}

/***********************************************
 *              Типизация данных
 **********************************************/

/* Табы */
export interface Tabs extends TitleAndKey {
  /** Состояние таба, проверяется по велью активного таба **/
  active: boolean;
  /** Колбек переключения, значение берется из ключа велью **/
  onClick: (value: string) => void;
  /** Значение, нужно для корректной работы табов **/
  value: string;
}

/* Кнопки хедера */
export interface HeaderButton extends TitleAndKey {
  /** Иконка **/
  element: ReactElement;
}

/* Пищевая ценность */
export interface IngredientNutrition extends TitleAndKey {
  /** Колличество **/
  value?: number;
}
