import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientsInitialState } from 'types/types';
import { v4 } from 'uuid';
import { getIngredientsThunk } from './ingredientsActions';

const initialState: IngredientsInitialState = {
  response: { success: false, data: [] },
  isPending: false,
  error: null,
  tab: 'bun',
  selectedCard: null,
};

export const slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    handleTabSwitch: (state, { payload }: PayloadAction<string>) => {
      state.tab = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isPending = true;
      state.error = null;
    });

    builder.addCase(getIngredientsThunk.rejected, (state, { error }) => {
      state.isPending = false;
      state.error = error;
    });

    builder.addCase(getIngredientsThunk.fulfilled, (state, { payload }) => {
      state.isPending = false;
      state.response.data = payload.data.map((item) => ({
        ...item,
        key: v4(),
      }));
    });
  },
});

export default slice.reducer;
