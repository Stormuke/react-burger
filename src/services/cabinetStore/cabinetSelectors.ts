import { createSelector } from '@reduxjs/toolkit';
import { CabinetInitial } from '../../types/types';

const selectSelf = (state: { cabinet: CabinetInitial }): CabinetInitial =>
  state.cabinet;

export const cabinetSelector = createSelector(
  selectSelf,
  (state) => state.cabinet,
);
