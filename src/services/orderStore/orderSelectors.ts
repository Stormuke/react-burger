import { createSelector } from '@reduxjs/toolkit';
import { OrderInitialState } from 'types/types';

const selectSelf = (state: { order: OrderInitialState }): OrderInitialState =>
  state.order;

const isPendingSelector = createSelector(
  selectSelf,
  (state) => state.isPending,
);

const responseSelector = createSelector(selectSelf, (state) => state.response);

const orderSelector = createSelector(selectSelf, (state) => state.order)

export const allOrderSelectors = createSelector(
  [responseSelector, isPendingSelector, orderSelector],
  (response, isPending, order) => ({ response, isPending, order }),
);
