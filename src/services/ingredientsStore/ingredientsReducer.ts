import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { IngredientsInitialState, UseIngredientsAction } from 'types/types';
import { v4 } from 'uuid';
import { getIngredientsThunk } from './ingredientsActions';
import { useAppDispatch } from '../rootReducer';

const initialState: IngredientsInitialState = {
  response: { success: false, data: [] },
  isPending: false,
  error: null,
  tab: 'bun',
};

const slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    handleTab: (state, { payload }: PayloadAction<string>) => {
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

export const useAllIngredientsActions = (): UseIngredientsAction => {
  const dispatch = useAppDispatch();

  const handleGetIngredients = useCallback(
    (endpoint) => dispatch(getIngredientsThunk(endpoint)),
    [dispatch],
  );

  const handleTabSwitch = useCallback(
    (value) => dispatch(slice.actions.handleTab(value)),
    [dispatch],
  );
  return { handleGetIngredients, handleTabSwitch };
};
