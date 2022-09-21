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
  /** Ключ **/
  key: string;
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
  /** Карточка ингредиента **/
  card: BurgerIngredientsData | null;
}

export interface CardProps {
  /** Данные ингредиента **/
  item: BurgerIngredientsData;
  /** Колбек открытия **/
  onClick: Callback;
  /** Передача ингредиента в попап **/
  setIngredient: (item: BurgerIngredientsData) => void;
}

export interface BurgerElementProps {
  index: number;
  /** Данные ингредиента **/
  item: BurgerIngredientsData;
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

/***********************************************
 *              Типизация Сторов
 **********************************************/

/* Начальные состояния */

export interface IngredientsInitialState {
  /** Ошибка **/
  error: AppError;
  /** Статус загрузки **/
  isPending: boolean;
  /** Ответ **/
  response: IngredientsData;
  /** Активный таб **/
  tab: string;
}

export interface OrderInitialState {
  /** Ошибка **/
  error: AppError;
  /** Статус загрузки **/
  isPending: boolean;
  /** Наполнение заказа **/
  order: BurgerIngredientsData[];
  /** Ответ **/
  response: Order;
}

/* Респонсы */

export interface Order {
  /** Название заказа **/
  name: string;
  /** Тело заказа **/
  order: {
    /** Номер заказа **/
    number: number;
  };
  /** Статус заказа **/
  success: boolean;
}

export interface IngredientsData {
  /** Массив ингредиентов **/
  data: BurgerIngredientsData[];
  /** Статус **/
  success: boolean;
}

/* Экшены */

export interface UseIngredientsAction {
  handleGetIngredients: (endpoint: Endpoint) => void;
  handleTabSwitch: (value: string) => void;
}

export interface UseOrderAction {
  handleDelete: (id: string) => void;
  handleDrop: (item: BurgerIngredientsData) => void;
  handlePostOrder: (data: { body: object; endpoint: Endpoint }) => void;
  handleReset: Callback;
  handleSort: (item: { dragIndex: number; hoverIndex: number }) => void;
}
