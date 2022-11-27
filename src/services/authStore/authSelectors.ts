import { createSelector } from '@reduxjs/toolkit';
import { AuthInitial } from '../../types/types';

const selectSelf = (state: { auth: AuthInitial }): AuthInitial => state.auth;

const formSelector = createSelector(selectSelf, (state) => state.form);

const isPendingSelector = createSelector(
  selectSelf,
  (state) => state.isPending,
);

export const allAuthSelector = createSelector(
  [formSelector, isPendingSelector],
  (form, isPending) => ({
    form,
    isPending,
  }),
);
