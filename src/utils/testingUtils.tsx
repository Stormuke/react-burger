import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'services/rootReducer';

export const wrapper: FC = ({ children }) => (
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
    </Provider>
  </BrowserRouter>
);
