import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CabinetInitial } from 'types/types';

const initialState: CabinetInitial = {
  isPending: false,
  inputs: {},
};

export const slice = createSlice({
  name: 'cabinet',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    handleInputsData: (
      state,
      { payload }: PayloadAction<Record<string, string>>,
    ) => {
      state.inputs = payload;
    },
    handleInputValue: (
      state,
      { payload }: PayloadAction<{ name: string; value: string }>,
    ) => {
      state.inputs = { ...state.inputs, [payload.name]: payload.value };
    },
  },
});

export default slice.reducer;
