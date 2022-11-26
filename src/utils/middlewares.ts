import { isRejected, isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

/**
 * Централизованная мидлвара для обработки ошибок с асинхронных запросов
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  try {
    if (isRejected(action) || isRejectedWithValue(action)) {
      console.groupCollapsed('rtkQueryErrorLogger'); // eslint-disable-line no-console
      console.warn('We got a rejected action!'); // eslint-disable-line no-console
      console.log(action); // eslint-disable-line no-console
      console.groupEnd(); // eslint-disable-line no-console

      if (action?.error) {
        // eslint-disable-next-line no-alert
        alert('Произошла ошибка, попробуйте еще раз')
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    next(action);
  }
};
