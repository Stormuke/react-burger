import { slice } from './feedReducer';
import { CloseReason, FeedOrder, WsMessage } from '../../types/types';
import { store } from '../rootReducer';

const orders: FeedOrder[] = [
  {
    ingredients: ['123', '123'],
    finalPrice: 312,
    status: 'test',
    number: 1,
    createdAt: '123',
    updatedAt: '123',
    name: '123',
  },
  {
    ingredients: ['123', '123'],
    finalPrice: 123,
    status: 'test',
    number: 1,
    createdAt: '123',
    name: '123',
    updatedAt: '123',
  },
  {
    ingredients: ['123', '123'],
    finalPrice: 123,
    status: 'test',
    number: 1,
    createdAt: '123',
    name: '123',
    updatedAt: '123',
  },
];

const ERROR_MESSAGE = 'Ошибка сокета';
const CLOSE_REASON: CloseReason = {
  code: 123,
  reason: 'test',
  wasClean: true,
}
const WS_MESSAGE: WsMessage = { orders, total: 123, totalToday: 321 }

describe('Тест стейтов сокета', () => {
  let state = store.getState().feed;

  it('Должен вернуть isConnected в значении true', () => {
    store.dispatch(slice.actions.wsConnectionSuccess());
    state = store.getState().feed;
    expect(state.wsOrders.state.isConnected).toBeTruthy();
  });

  it('Должен вернуть isAuthConnected в значении true', () => {
    store.dispatch(slice.actions.wsAuthConnectionSuccess());
    state = store.getState().feed;
    expect(state.wsOrders.authState.isAuthConnected).toBeTruthy();
  });

  it('Должен вернуть wsConnectionError с ошибкой и isConnected в значении false', () => {
    store.dispatch(slice.actions.wsConnectionError(ERROR_MESSAGE));
    state = store.getState().feed;

    expect(state.wsOrders.state.error).toEqual(ERROR_MESSAGE);
    expect(state.wsOrders.state.isConnected).toBeFalsy();
  });

  it('Должен вернуть wsConnectionClosed с ошибкой и isConnected в значении false', () => {
    store.dispatch(
      slice.actions.wsConnectionClosed(CLOSE_REASON),
    );

    state = store.getState().feed;
    expect(state.wsOrders.state.closeReason).toEqual(CLOSE_REASON);
    expect(state.wsOrders.state.isConnected).toBeFalsy();
  });

  it('Должен вернуть wsAuthConnectionClosed с ошибкой и isAuthConnected в значении false', () => {
    store.dispatch(
      slice.actions.wsAuthConnectionClosed(CLOSE_REASON),
    );
    state = store.getState().feed;
    expect(state.wsOrders.authState.isAuthConnected).toBeFalsy();
    expect(state.wsOrders.authState.closeReason).toEqual(CLOSE_REASON);
  });

  it('wsGetMessage должен вернуть массив полученых заказов, количество заказов за день и за все время', () => {
    store.dispatch(
      slice.actions.wsGetMessage(WS_MESSAGE),
    );
    state = store.getState().feed;

    expect(state.wsOrders.orders).toEqual(WS_MESSAGE);
  });

  it('wsAuthGetMessage должен вернуть массив текущих заказов пользователя', () => {
    store.dispatch(
      slice.actions.wsAuthGetMessage(WS_MESSAGE),
    );
    state = store.getState().feed;
    expect(state.wsOrders.authState.currentUserOrders.orders).toEqual(orders);
  });
});
