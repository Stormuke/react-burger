import { createSelector } from '@reduxjs/toolkit';
import { IngredientsInitialState } from '../../types/types';

const selectSelf = (state: {
  ingredients: IngredientsInitialState;
}): IngredientsInitialState => state.ingredients;

const responseSelector = createSelector(selectSelf, (state) => state.response);

const isPendingSelector = createSelector(
  selectSelf,
  (state) => state.isPending,
);

const tabSelector = createSelector(selectSelf, (state) => state.tab);

export const allIngredientsSelectors = createSelector(
  [responseSelector, isPendingSelector, tabSelector],
  (response, isPending, tab) => ({ response, isPending, tab }),
);
