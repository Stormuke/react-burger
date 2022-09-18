import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../services/rootReducer';

export const withReduxStore = (component: () => FC) => () =>
  <Provider store={store}>{component()}</Provider>;
