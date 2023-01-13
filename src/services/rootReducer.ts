import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  AuthStore,
  CabinetStore,
  IngredientsStore,
  FeedStore,
  OrderStore,
} from 'services';
import { rtkQueryErrorLogger, webSocketMiddleware } from 'utils/middlewares';
import { getCookie } from 'utils/cookie';

const rootReducer = {
  ingredients: IngredientsStore.ingredientsReducer,
  order: OrderStore.orderReducer,
  auth: AuthStore.authReducer,
  cabinet: CabinetStore.cabinetReducer,
  [FeedStore.reducers.slice.name]: FeedStore.reducers.slice.reducer,
};

const accessToken = getCookie('accessToken');

const middlewares = [
  webSocketMiddleware(
    'wss://norma.nomoreparties.space/orders/all',
    FeedStore.reducers.wsAction,
  ),
    webSocketMiddleware(
    'wss://norma.nomoreparties.space/orders',
    FeedStore.reducers.wsAuthActions,
    Boolean(accessToken !== ''),
  ),
  rtkQueryErrorLogger,
];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
