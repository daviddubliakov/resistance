import { Outlet, ScrollRestoration } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useAxiosErrorHandler } from '../../hooks/useAxiosErrorHandler';

export const RootLayout = () => {
  useAxiosErrorHandler();

  return (
    <main>
      <Outlet />
      <ScrollRestoration getKey={location => location.key} />
      <SpeedInsights />
    </main>
  );
};
