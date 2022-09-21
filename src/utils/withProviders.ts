import compose from 'compose-function';
import { withRouter } from './Providers/withRouter';
import { withReduxStore } from './Providers/withRedusStore';
import { withErrorBoundary } from './Providers/withErrorBoundary';
import { withDragAndDrop } from './Providers/withDragAndDrop';

export const withProviders = compose(
  withReduxStore,
  withRouter,
  withErrorBoundary,
  withDragAndDrop,
);
