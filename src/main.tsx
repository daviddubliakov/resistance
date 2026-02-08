import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HomePage from './pages/home';
import RatingPage from './pages/rating';
import PersonPage from './pages/person';
import LatestPage from './pages/latest';
import DetailsPage from './pages/details';
import AboutUsPage from './pages/aboutUs';
import { RootLayout } from './components/root-layout';
import Error500Page from './pages/error500';
import Error404Page from './pages/error404';

import './index.css';
import 'normalize.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <Error500Page />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/rating', element: <RatingPage /> },
      { path: '/person/:id', element: <PersonPage /> },
      { path: '/shames', element: <LatestPage /> },
      { path: '/details/:id', element: <DetailsPage /> },
      { path: '/about-us', element: <AboutUsPage /> },
      { path: '/500', element: <Error500Page /> },
      { path: '*', element: <Error404Page /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<Error500Page />}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);
