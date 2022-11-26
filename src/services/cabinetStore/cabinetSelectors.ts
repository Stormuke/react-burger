import { createSelector } from '@reduxjs/toolkit';
import { CabinetInitial } from '../../types/types';

const selectSelf = (state: { cabinet: CabinetInitial }): CabinetInitial =>
  state.cabinet;

const inputsSelector = createSelector(selectSelf, (state) => state.inputs);

export const allCabinetSelector = createSelector(
  [inputsSelector],
  (inputs) => ({
    inputs,
  }),
);
