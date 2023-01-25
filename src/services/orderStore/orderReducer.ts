import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BurgerIngredientsData, OrderInitialState } from 'types/types';
import { postOrderThunk } from './orderActions';

export const initialState: OrderInitialState = {
  orders: {
    isPending: false,
    error: null,
    response: {
      success: false,
      name: '',
      order: { number: 0 },
    },
    order: [],
  },
};

export const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    handleDrop: (state, { payload }: PayloadAction<BurgerIngredientsData>) => {
      if (payload.type === 'bun') {
        state.orders.order =
          state.orders.order.length === 0
            ? [payload]
            : [
                payload,
                ...state.orders.order.slice(1, state.orders.order.length),
              ];
      } else if (state.orders.order.length === 0) {
        state.orders.order = [];
      } else {
        state.orders.order = [...state.orders.order, payload];
      }
    },
    handleDelete: (state, { payload }: PayloadAction<string>) => {
      state.orders.order = state.orders.order.filter((i) => i.key !== payload);
    },
    handleSort: (
      state,
      { payload }: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
    ) => {
      const dragItem = state.orders.order[payload.dragIndex];

      if (dragItem) {
        const newArr = [...state.orders.order];

        const deleteItem = newArr.splice(payload.hoverIndex, 1, dragItem);

        newArr.splice(payload.dragIndex, 1, deleteItem[0]);

        state.orders.order = newArr;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrderThunk.pending, (state) => {
      state.orders.isPending = true;
      state.orders.error = null;
    });

    builder.addCase(postOrderThunk.rejected, (state, { error }) => {
      state.orders.isPending = false;
      state.orders.error = error;
    });

    builder.addCase(postOrderThunk.fulfilled, (state, { payload }) => {
      state.orders.isPending = false;
      state.orders.response = payload;
    });
  },
});
