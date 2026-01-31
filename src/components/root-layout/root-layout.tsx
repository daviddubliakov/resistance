import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useAxiosErrorHandler } from '../../hooks/useAxiosErrorHandler';

export const RootLayout = () => {
  useAxiosErrorHandler();

  return (
    <main>
      <Outlet />
      <ScrollRestoration getKey={location => location.key} />
    </main>
  );
};
