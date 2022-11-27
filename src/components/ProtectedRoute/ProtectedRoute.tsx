import { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute: FC = ({ children }) => {
  const accessToken = getCookie('accessToken');

  return accessToken ? <div>{children}</div> : <Redirect to="/login" />;
};
