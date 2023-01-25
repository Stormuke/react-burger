import { UserData } from 'types/types';
import { act, renderHook } from '@testing-library/react-hooks/pure';
import { wrapper } from 'utils/testingUtils';
import { useCreateSliceActions } from 'utils/useCreateSliceActions';
import { store } from '../rootReducer';
import { getUserDataThunk, patchUserDataThunk } from './cabinetActions';
import { slice } from './cabinetReducer';

describe('Тест стора кабинета', () => {
  describe('Тест запросов кабинета', () => {
    let state = store.getState().cabinet;
    const getUser = {
      url: 'user',
      cookie: 'cookie',
    };
    const patchUser = {
      body: { name: 'userName', email: 'mail@mail.ru' },
      cookie: '123',
      url: 'patch',
    };

    const fulfilledData: UserData = {
      success: true,
      user: {
        name: 'userName1',
        email: 'mail@mail2.ru',
      },
    };

    it('Тест pending получения юзера', () => {
      store.dispatch(getUserDataThunk.pending('', getUser));
      state = store.getState().cabinet;

      expect(state.cabinet.isPending).toBeTruthy();
    });

    it('Тест pending патч юзера', () => {
      store.dispatch(patchUserDataThunk.pending('', patchUser));
      state = store.getState().cabinet;

      expect(state.cabinet.isPending).toBeTruthy();
    });

    it('Тест получения данных юзера', () => {
      store.dispatch(getUserDataThunk.pending('', getUser));
      state = store.getState().cabinet;

      expect(state.cabinet.isPending).toBeTruthy();

      store.dispatch(getUserDataThunk.fulfilled(fulfilledData, '', getUser));

      state = store.getState().cabinet;

      expect(state.cabinet.isPending).toBeFalsy();
      expect(state.cabinet.inputs).toEqual({
        ...fulfilledData.user,
        password: '',
      });
      expect(state.cabinet.form).toEqual({
        ...fulfilledData.user,
        password: '',
      });
    });

    it('Тест обновления данных юзера', () => {
      store.dispatch(patchUserDataThunk.pending('', patchUser));

      state = store.getState().cabinet;
      expect(state.cabinet.isPending).toBeTruthy();

      store.dispatch(
        patchUserDataThunk.fulfilled(fulfilledData, '', patchUser),
      );

      state = store.getState().cabinet;

      expect(state.cabinet.isPending).toBeFalsy();
      expect(state.cabinet.inputs).toEqual({
        ...fulfilledData.user,
        password: state.cabinet.inputs.password,
      });
    });
  });

  describe('Тест slice экшенов', () => {
    const getUser = {
      url: 'user',
      cookie: 'cookie',
    };

    const fulfilledData: UserData = {
      success: true,
      user: {
        name: 'userName1',
        email: 'mail@mail2.ru',
      },
    };

    let state = store.getState().cabinet;
    const {
      result: {
        current: { handleInputValue },
      },
    } = renderHook(() => useCreateSliceActions(slice.actions), {
      wrapper,
    });
    it('Тест заполенения формы', () => {
      store.dispatch(getUserDataThunk.fulfilled(fulfilledData, '', getUser));

      state = store.getState().cabinet;

      act(() => {
        handleInputValue({ name: 'email', value: 'newMail@mail22.ru' });
        handleInputValue({ name: 'testField', value: 'testValue' });
      });

      state = store.getState().cabinet;

      expect(state.cabinet.inputs).toEqual({
        ...fulfilledData.user,
        password: '',
      });
      expect(state.cabinet.form).toEqual({
        email: 'newMail@mail22.ru',
        name: 'userName1',
        password: '',
        testField: 'testValue',
      });
    });
  });
});
