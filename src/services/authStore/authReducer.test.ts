import { AuthRequest, AuthResponse } from 'types/types';
import { act, renderHook } from '@testing-library/react-hooks/pure';
import { useCreateSliceActions } from 'utils/useCreateSliceActions';
import { wrapper } from 'utils/testingUtils';
import { store } from '../rootReducer';
import { postAuthFormThunk } from './authActions';
import { slice } from './authReducer';

describe('Тест стора авторизации', () => {
  let state = store.getState().auth;

  describe('Тест запросов', () => {
    afterEach(() => store.dispatch(slice.actions.reset()));

    const postUser: AuthRequest = {
      body: {
        email: 'user@mail.ru',
        password: '123',
      },
      endpoint: 'auth',
    };

    const fulfilledData: AuthResponse = {
      refreshToken: '123',
      success: true,
      user: { email: 'user@mail.ru', name: 'userName' },
      accessToken: 'token',
    };

    it('Тест пендинг статуса', () => {
      store.dispatch(postAuthFormThunk.pending('', postUser));

      state = store.getState().auth;

      expect(state.isPending).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('Тест получения данных', () => {
      store.dispatch(postAuthFormThunk.pending('', postUser));
      state = store.getState().auth;
      expect(state.isPending).toBeTruthy();

      store.dispatch(postAuthFormThunk.fulfilled(fulfilledData, '', postUser));

      state = store.getState().auth;

      expect(state.error).toBeNull();
      expect(state.isPending).toBeFalsy();
    });

    it('Тест ошибки', () => {
      const ERROR_MESSAGE = 'Ошибка';
      store.dispatch(
        postAuthFormThunk.rejected(new Error(ERROR_MESSAGE), '', postUser),
      );

      state = store.getState().auth;

      expect(state.isPending).toBeFalsy();
      expect(
        (state.error as import('@reduxjs/toolkit').SerializedError).message,
      ).toEqual(ERROR_MESSAGE);
    });
  });

  describe('Тест slice экшенов', () => {
    const {
      result: {
        current: { handleInput },
      },
    } = renderHook(() => useCreateSliceActions(slice.actions), { wrapper });

    it('Тест заполнения формы', () => {
      state = store.getState().auth;
      const testingKey = (key: string): number =>
        state.form.findIndex((i) => i.key === key);

      act(() => {
        handleInput({ key: '1', value: '123' });
        handleInput({ key: '2', value: 'mail@mail.ru' });
      });

      state = store.getState().auth;

      expect(state.form[testingKey('1')].value).toEqual('123');
      expect(state.form[testingKey('2')].value).toEqual('mail@mail.ru');
    });
  });
});
