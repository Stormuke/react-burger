import {
  CaseReducerActions,
  SliceCaseReducers,
} from '@reduxjs/toolkit/src/createSlice';
import { useMemo } from 'react';
import { useAppDispatch } from 'services/rootReducer';

export const useCreateSliceActions = <
  State,
  T extends CaseReducerActions<SliceCaseReducers<State>> = CaseReducerActions<
    SliceCaseReducers<State>
  >,
>(
  sliceActions: T,
): ParseActions<T> => {
  const dispatch = useAppDispatch();

  const actions = useMemo(
    () =>
      Object.entries(sliceActions).reduce(
        (acc, [name, func]) => ({
          ...acc,
          [name]: (payload) => dispatch(func(payload)),
        }),
        {} as ParseActions<T>,
      ),
    // дизейбл линтера, зависимости не нужны
    // eslint-disable-next-line
    [],
  );

  return actions;
};
