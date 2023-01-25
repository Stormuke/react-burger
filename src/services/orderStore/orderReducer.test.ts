import { BurgerIngredientsData, Order } from 'types/types';
import { wrapper } from 'utils/testingUtils';
import { useCreateSliceActions } from 'utils/useCreateSliceActions';
import { act, renderHook } from '@testing-library/react-hooks/pure';
import { initialState, slice } from './orderReducer';
import { store } from '../rootReducer';
import { postOrderThunk } from './orderActions';

describe('Тест стора заказов', () => {
  describe('Тест Api запросов создания заказов', () => {
    afterEach(() => {
      store.dispatch(slice.actions.reset());
    });
    const postBody = {
      body: { ingredients: ['1', '2'] },
      cookie: 'cookie',
      endpoint: 'order',
    };

    let state = store.getState().order;

    afterEach(() => {
      store.dispatch(slice.actions.reset());
    });

    it('Должен вернуть isPending: true при начале запроса', () => {
      store.dispatch(postOrderThunk.pending('', postBody));

      state = store.getState().order;

      expect(state.orders.isPending).toBeTruthy();
    });

    it('Должен создавать заказ', () => {
      const fulfilled: Order = {
        name: 'testName',
        order: {
          number: 1,
        },
        success: true,
      };

      store.dispatch(postOrderThunk.pending('', postBody));

      state = store.getState().order;

      expect(state.orders.isPending).toBeTruthy();
      expect(state.orders.error).toBeNull();

      store.dispatch(postOrderThunk.fulfilled(fulfilled, '', postBody));

      state = store.getState().order;

      expect(state.orders.isPending).toBeFalsy();
      expect(state.orders.response).toEqual(fulfilled);
      expect(state.orders.error).toBeNull();
    });

    it('Тест кейса ошибки', () => {
      const ERROR_MESSAGE = 'Ошибка';

      state = store.getState().order;

      expect(state.orders.error).toBeNull();
      expect(state.orders).toEqual(initialState.orders);

      store.dispatch(
        postOrderThunk.rejected(new Error(ERROR_MESSAGE), '', postBody),
      );

      state = store.getState().order;

      expect(
        (state.orders.error as import('@reduxjs/toolkit').SerializedError)
          .message,
      ).toBe(ERROR_MESSAGE);
      expect(state.orders.isPending).toBeFalsy();

      store.dispatch(postOrderThunk.pending('', postBody));

      state = store.getState().order;

      expect(state.orders.error).toBeNull();
    });
  });

  describe('slice тест', () => {
    afterEach(() => {
      store.dispatch(slice.actions.reset());
    });

    let state = store.getState().order;

    const ingredient = (type: string): BurgerIngredientsData => ({
      __v: 1,
      _id: '123',
      calories: 123,
      carbohydrates: 321,
      fat: 321,
      image: 'image',
      image_large: 'bigImage',
      image_mobile: 'smallImage',
      key: `${type}-123`,
      name: 'nameTest',
      price: 1234,
      proteins: 123,
      type,
    });

    const {
      result: {
        current: { handleDrop, handleDelete, handleSort },
      },
    } = renderHook(() => useCreateSliceActions(slice.actions), { wrapper });

    it('Тест наполнения заказа', () => {
      expect(state.orders.order).toEqual(initialState.orders.order);

      act(() => {
        handleDrop(ingredient('bun'));
      });

      state = store.getState().order;

      expect(state.orders.order).toEqual([ingredient('bun')]);

      state = store.getState().order;

      act(() => {
        handleDrop(ingredient('sauce'));
      });

      state = store.getState().order;

      expect(state.orders.order).toEqual([
        ingredient('bun'),
        ingredient('sauce'),
      ]);
    });

    it('Удаление ингредиента', () => {
      act(() => {
        handleDrop(ingredient('bun'));
        handleDrop(ingredient('sauce'));
      });

      state = store.getState().order;

      act(() => {
        handleDelete('sauce-123');
      });

      state = store.getState().order;

      expect(state.orders.order).toEqual([ingredient('bun')]);
    });

    it('Тест сортировки', () => {
      act(() => {
        handleDrop(ingredient('bun'));
        handleDrop(ingredient('sauce'));
        handleDrop(ingredient('main'));
      });

      state = store.getState().order;

      act(() => handleSort({ dragIndex: 1, hoverIndex: 2 }));

      state = store.getState().order;

      expect(state.orders.order).toEqual([
        ingredient('bun'),
        ingredient('main'),
        ingredient('sauce'),
      ]);
    });
  });
});
