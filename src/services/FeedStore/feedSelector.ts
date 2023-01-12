import { createSelector } from '@reduxjs/toolkit';
import { FeedInitial } from 'types/types';

const selectSelf = (state: { orders: FeedInitial }): FeedInitial =>
  state.orders;

export const feedSelector = createSelector(
  selectSelf,
  (state) => state.wsOrders,
);
