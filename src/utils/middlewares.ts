import {
  AnyAction,
  isRejected,
  isRejectedWithValue,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { getCookie } from './cookie';
import { CloseReason, WsActions } from '../types/types';

/**
 * Централизованная мидлвара для обработки ошибок с асинхронных запросов
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  try {
    if (isRejected(action) || isRejectedWithValue(action)) {
      console.groupCollapsed('rtkQueryErrorLogger'); // eslint-disable-line no-console
      console.log(action); // eslint-disable-line no-console
      console.groupEnd(); // eslint-disable-line no-console

      if (action?.error) {
        console.log('Произошла ошибка, попробуйте еще раз'); // eslint-disable-line no-console
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    next(action);
  }
};

/**
 * мидлвара для подключения по веб сокетам
 */

export const webSocketMiddleware =
  (wsUrl: string, wsActions: WsActions, isAuth?: boolean) =>
  (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { onOpen, onError, onClose, wsInit, onMessage, wsSendMessage } =
        wsActions;
      const { dispatch } = store;
      const { type, payload } = action;

      const token = getCookie('accessToken');

      if (type === wsInit.type) {
        socket = new WebSocket(isAuth ? `${wsUrl}?token=${token}` : wsUrl);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (error) => {
          dispatch(onError(`Ошибка: ${error}`));
        };

        socket.onclose = (event) => {
          const closeReason: CloseReason = {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean,
          };

          dispatch(onClose(closeReason));
          socket = null;
        };

        socket.onmessage = (event: MessageEvent) => {
          const parsedData = JSON.parse(event.data);
          dispatch(onMessage(parsedData));
        };

        if (type === onClose.type) {
          socket.close();
        }

        if (type === wsSendMessage.type) {
          const message = isAuth ? { ...payload, token } : { ...payload };

          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
