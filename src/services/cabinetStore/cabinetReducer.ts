import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CabinetInitial } from 'types/types';
import { getUserDataThunk, patchUserDataThunk } from './cabinetActions';

const initialState: CabinetInitial = {
  cabinet: {
    isPending: false,
    inputs: {},
    form: {},
  },
};

export const slice = createSlice({
  name: 'cabinet',
  initialState,
  reducers: {
    resetForm: (state) => {
      state.cabinet.form = state.cabinet.inputs;
    },
    handleInputValue: (
      state,
      { payload }: PayloadAction<{ name: string; value: string }>,
    ) => {
      state.cabinet.form = {
        ...state.cabinet.form,
        [payload.name]: payload.value,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDataThunk.pending, (state) => {
      state.cabinet.isPending = true;
    });

    builder.addCase(getUserDataThunk.fulfilled, (state, { payload }) => {
      state.cabinet.isPending = false;
      state.cabinet.inputs = { ...payload.user, password: '' };
      state.cabinet.form = { ...payload.user, password: '' };
    });
    builder.addCase(patchUserDataThunk.pending, (state) => {
      state.cabinet.isPending = true;
    });

    builder.addCase(patchUserDataThunk.fulfilled, (state, { payload }) => {
      state.cabinet.isPending = false;
      state.cabinet.inputs = {
        ...payload.user,
        password: state.cabinet.form.password,
      };
    });
  },
});

export default slice.reducer;
