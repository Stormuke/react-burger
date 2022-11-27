import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthInitial, Input } from 'types/types';
import { postAuthFormThunk } from './authActions';
import { setCookie } from '../../utils/cookie';

const initialState: AuthInitial = {
  isPending: false,
  error: null,
  form: [
    { value: '', key: '1', placeholder: 'Имя', type: 'text', name: 'name' },
    {
      value: '',
      key: '2',
      placeholder: 'E-mail',
      type: 'email',
      name: 'email',
    },
    {
      value: '',
      key: '3',
      placeholder: 'Пароль',
      type: 'password',
      name: 'password',
    },
    {
      value: '',
      key: '4',
      placeholder: 'Введите код из письма',
      type: 'text',
      name: 'token',
    },
  ],
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    handleInput: (state, { payload }: PayloadAction<Input>) => {
      state.form = state.form.map((item) => ({
        ...item,
        value: payload.key === item.key ? payload.value : item.value,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postAuthFormThunk.pending, (state) => {
      state.error = null;
      state.isPending = true;
    });

    builder.addCase(postAuthFormThunk.rejected, (state, { error }) => {
      state.error = error;
      state.isPending = false;
    });
    builder.addCase(postAuthFormThunk.fulfilled, (state, { payload }) => {
      state.isPending = false;
      setCookie('accessToken', payload.accessToken.split(' ')[1]);
      setCookie('refreshToken', payload.refreshToken);
    });
  },
});

export default slice.reducer;
