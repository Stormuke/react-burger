import { createSelector } from '@reduxjs/toolkit';
import { FeedInitial } from 'types/types';

const selectSelf = (state: { feed: FeedInitial }): FeedInitial =>
  state.feed;

export const feedSelector = createSelector(
  selectSelf,
  (state) => state.wsOrders,
);
