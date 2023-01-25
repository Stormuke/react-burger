import { createSelector } from '@reduxjs/toolkit';
import { OrderInitialState } from 'types/types';

const selectSelf = (state: { order: OrderInitialState }): OrderInitialState =>
  state.order;

export const dataSelector = createSelector(selectSelf, (state) => state.orders);
