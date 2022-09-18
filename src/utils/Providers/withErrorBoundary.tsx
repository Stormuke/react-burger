import { ComponentType, FC } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ErrorFallback: ComponentType<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div role="alert">
    <p>{error}</p>
    <Button onClick={resetErrorBoundary}>Обновить страницу</Button>
  </div>
);

const myErrorHandler = (
  error: Error,
  info: { componentStack: string },
): void => {
  // eslint-disable-next-line no-console
  console.error({ error, info });
};

export const withErrorBoundary = (component: () => FC) => () =>
  (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      {component()}
    </ErrorBoundary>
  );
