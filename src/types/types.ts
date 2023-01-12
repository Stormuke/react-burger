import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
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
  /** Роут **/
  route: string;
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
  selectedCard: BurgerIngredientsData | null;
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

export interface UseOrderAction {
  handleDelete: (id: string) => void;
  handleDrop: (item: BurgerIngredientsData) => void;
  handlePostOrder: (data: {
    body: object;
    cookie: string;
    endpoint: Endpoint;
  }) => void;
  handleReset: Callback;
  handleSort: (item: { dragIndex: number; hoverIndex: number }) => void;
}

export interface AuthInitial {
  /** Ошибка**/
  error: AppError;
  /** Форма **/
  form: AuthForm[];
  /** Статус пендинга **/
  isPending: boolean;
}

type AuthForm = Omit<Form, 'name'> & {
  name: 'name' | 'email' | 'password' | 'token';
};

export interface Form {
  /** Ключ **/
  key: string;
  /** Имя **/
  name: 'name' | 'email' | 'password';
  /** Подсказка **/
  placeholder: string;
  /** Тип инпута **/
  type: 'text' | 'email' | 'password';
  /** Значение инпута **/
  value: string;
}

export interface Input {
  /** Ключ **/
  key: string;
  /** Значение **/
  value: string;
}

export interface Navigation extends TitleAndKey {
  /** Ссылка навигации **/
  link: string;
  /** Подсказка **/
  linkText: string;
  /** Колбек кнопки**/
  onClick?: Callback;
}

export interface AuthResponse {
  /** Токен обновления **/
  refreshToken: string;
  /** Статус запроса **/
  success: boolean;
  /** Данные юзера **/
  user: User;
  /** Токен доступа **/
  accessToken?: string;
}

export interface CabinetInitial {
  cabinet: Cabinet;
}

interface Cabinet {
  /** Объект формы **/
  form: Record<string, string>;
  /** Объект инпутов **/
  inputs: Record<string, string>;
  /** Статус **/
  isPending: boolean;
}

export type User = {
  /** Почта **/
  email: string;
  /** Имя **/
  name: string;
};

export interface FeedInitial {
  /** Лента заказов **/
  wsOrders: WsOrders;
}

interface WsOrders {
  /** Стейт юзера **/
  authState: wsAuthState;
  /** Общие заказы **/
  orders: WsMessage;
  /** Состояние подключения к сокету **/
  state: wsState;
}

export interface WsMessage {
  /** Массив заказов **/
  orders: FeedOrder[];
  /** Всего **/
  total: number;
  /** Всего сегодня **/
  totalToday: number;
}

interface wsState {
  /** Причина закрытия соединения **/
  closeReason: null | CloseReason;
  /** Ошибка **/
  error: AppError;
  /** Успешное подключение **/
  isConnected: boolean;
}

interface wsAuthState {
  /** Стор конкретного юзера **/
  currentUserOrders: WsMessage;
  /** Успешно подключеное авторизованое соединение **/
  isAuthConnected: boolean;
}

export interface CloseReason {
  /** Код ошибки **/
  code: number;
  /** Причина **/
  reason: string;
  wasClean: boolean;
}

export interface WsActions {
  onClose: ActionCreatorWithPayload<CloseReason>;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<WsMessage>;
  onOpen: ActionCreatorWithoutPayload;
  wsInit: ActionCreatorWithoutPayload;
  wsSendMessage: ActionCreatorWithoutPayload;
}

export interface FeedOrder {
  /** Дата создания **/
  createdAt: string;
  /** Финальная цена **/
  finalPrice: number;
  /** Айди ингредиентов **/
  ingredients: string[];
  /** Название заказа **/
  name: string;
  /** Номер заказа **/
  number: number;
  /** Статус **/
  status: string;
  /** Время обновления **/
  updatedAt: string;
}

export interface FeedCardData {
  /** Время заказа **/
  date: string;
  /** Массив заказов **/
  details: ParsedOrderArray[];
  /** Номер заказа **/
  orderNumber: string;
  /** Цена **/
  price: number;
  /** Статус **/
  status: string;
  /** Название заказа **/
  title: string;
}

export interface FeedDetailsProps {
  /** Массив заказов **/
  feedArray: FeedOrder[];
}

export interface ParsedOrderDetails {
  /** Массив распаршеных заказов **/
  array: ParsedOrderArray[];
  /** Цена **/
  totalPrice: number;
}

interface ParsedOrderArray {
  /** Колличество игредиентов **/
  count: number;
  /** Айди ингредиента **/
  id: string;
  /** Картинка **/
  image: string;
  /** Название **/
  name: string;
  /** Стоимость **/
  price: number;
}

export type ParsedFeed = ParsedOrderDetails & {
  /** Дата заказа **/
  date: string;
  /** Номер заказа **/
  orderNumber: string;
  /** Статус **/
  status: string;
  /** Название заказа **/
  title: string;
};

export interface FeedListProps {
  /** Массив заказов **/
  feedArray: FeedOrder[];
  /** Стейт компонента **/
  isFull?: boolean;
}
