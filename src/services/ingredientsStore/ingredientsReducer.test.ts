import { store } from 'services/rootReducer';
import { IngredientsData } from 'types/types';
import { useCreateSliceActions } from 'utils/useCreateSliceActions';
import { act, renderHook } from '@testing-library/react-hooks/pure';
import { wrapper } from 'utils/testingUtils';
import { getIngredientsThunk } from './ingredientsActions';
import { initialState, slice } from './ingredientsReducer';

describe('Тест стора игредиентов', () => {
  describe('Тест Api запросов данных ингредиентов', () => {
    afterEach(() => {
      store.dispatch(slice.actions.reset());
    });

    it('Должен вернуть isPending: true при начале запроса', () => {
      store.dispatch(getIngredientsThunk.pending('', ''));

      const { isPending } = store.getState().ingredients;

      expect(isPending).toBeTruthy();
    });

    it('Должен сделать запрос ингредиентов', () => {
      store.dispatch(getIngredientsThunk.pending('', ''));
      let state = store.getState().ingredients;

      expect(state.isPending).toBeTruthy();
      expect(state.response.data).toEqual([]);
      expect(state.error).toBeNull();

      const fulfilledData: IngredientsData = {
        success: true,
        data: [
          {
            __v: 1,
            _id: '123',
            calories: 123,
            carbohydrates: 321,
            fat: 321,
            image: 'image',
            image_large: 'bigImage',
            image_mobile: 'smallImage',
            key: '123',
            name: 'nameTest',
            price: 1234,
            proteins: 123,
            type: 'bun',
          },
        ],
      };

      store.dispatch(getIngredientsThunk.fulfilled(fulfilledData, '', ''));

      state = store.getState().ingredients;

      expect(state.isPending).toBeFalsy();
      expect(state.response.data).toEqual(
        fulfilledData.data.map((item) => ({
          ...item,
          key: state.response.data[0].key,
        })),
      );
      expect(state.error).toBeNull();
    });

    it('Должен вернуть ошибку при реджекте и при повторном запросе ошибку сбросить', () => {
      const ERROR_MESSAGE = 'Ошибка';
      let state = store.getState().ingredients;

      expect(state).toEqual(initialState);
      expect(state.error).toBeNull();

      store.dispatch(
        getIngredientsThunk.rejected(new Error(ERROR_MESSAGE), '', ''),
      );

      state = store.getState().ingredients;

      expect((state.error as import('@reduxjs/toolkit').SerializedError).message).toBe(ERROR_MESSAGE);

      store.dispatch(getIngredientsThunk.pending('', ''));

      state = store.getState().ingredients;

      expect(state.error).toBeNull();
    });
  });

  describe('slice тест', () => {
    afterEach(() => {
      store.dispatch(slice.actions.reset());
    });

    it('тест переключения табов', () => {
      let state = store.getState().ingredients;

      const {
        result: {
          current: { handleTabSwitch },
        },
      } = renderHook(() => useCreateSliceActions(slice.actions), {wrapper});

      expect(state.tab).toEqual('bun');

      act(() => handleTabSwitch('sauce'));

      state = store.getState().ingredients;

      expect(state.tab).toEqual('sauce');
    });
  });

})
