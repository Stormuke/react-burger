import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import {
  BurgerIngredientsData,
  OrderInitialState,
  UseOrderAction,
} from 'types/types';
import { postOrderThunk } from './orderActions';
import { useAppDispatch } from '../rootReducer';

const initialState: OrderInitialState = {
  isPending: false,
  error: null,
  response: {
    success: false,
    name: '',
    order: { number: 0 },
  },
  order: [],
};

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    reset: () => ({ ...initialState, order: [] }),
    handleDrop: (state, { payload }: PayloadAction<BurgerIngredientsData>) => {
      if (payload.type === 'bun') {
        state.order =
          state.order.length === 0
            ? [payload]
            : [payload, ...state.order.slice(1, state.order.length)];
      } else if (state.order.length === 0) {
        state.order = [];
      } else {
        state.order = [...state.order, payload];
      }
    },
    handleDelete: (state, { payload }: PayloadAction<string>) => {
      state.order = state.order.filter((i) => i.key !== payload);
    },
    handleSort: (
      state,
      { payload }: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
    ) => {
      const dragItem = state.order[payload.dragIndex];

      if (dragItem) {
        const newArr = [...state.order];

        const deleteItem = newArr.splice(
          payload.hoverIndex,
          1,
          dragItem,
        );

        newArr.splice(payload.dragIndex, 1, deleteItem[0]);

        state.order = newArr;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrderThunk.pending, (state) => {
      state.isPending = true;
      state.error = null;
    });

    builder.addCase(postOrderThunk.rejected, (state, { error }) => {
      state.isPending = false;
      state.error = error;
    });

    builder.addCase(postOrderThunk.fulfilled, (state, { payload }) => {
      state.isPending = false;
      state.response = payload;
    });
  },
});

export default slice.reducer;

export const useAllOrderActions = (): UseOrderAction => {
  const dispatch = useAppDispatch();

  const handlePostOrder = useCallback(
    (data) => dispatch(postOrderThunk(data)),
    [dispatch],
  );

  const handleDrop = useCallback(
    (item) => dispatch(slice.actions.handleDrop(item)),
    [dispatch],
  );

  const handleDelete = useCallback(
    (id) => dispatch(slice.actions.handleDelete(id)),
    [dispatch],
  );

  const handleReset = useCallback(
    () => dispatch(slice.actions.reset()),
    [dispatch],
  );

  const handleSort = useCallback(
    (item) => dispatch(slice.actions.handleSort(item)),
    [dispatch],
  );

  return { handlePostOrder, handleDrop, handleDelete, handleReset, handleSort };
};
