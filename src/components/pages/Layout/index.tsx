import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => (
  <Suspense fallback='...Загрузка'>
    <Outlet />
  </Suspense>
);

export default Layout;
