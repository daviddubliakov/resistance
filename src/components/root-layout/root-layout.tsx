import { Outlet, ScrollRestoration } from 'react-router-dom'

export const RootLayout = () => (
  <main>
    <Outlet />
    <ScrollRestoration getKey={(location) => location.key} />
  </main>
)
