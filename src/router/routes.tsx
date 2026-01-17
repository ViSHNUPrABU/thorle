// src/router/routes.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../components/RootLayout';
import { DashboardsListPage } from '../pages/Dashboards/DashboardsListPage';
import { DashboardDetailPage } from '../pages/Dashboards/DashboardDetailPage';
import { DatabasePage } from '../pages/Database/DatabasePage';
import { dashboardsLoader, dashboardDetailLoader, databaseLoader } from '../services/apiService';

/**
 * Routes configuration with loader functions
 * Uses react-router loaders for initial data fetch
 * Widget-level data fetching still uses react-query via ComponentWrapper
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboards" replace />,
      },
      {
        path: 'dashboards',
        element: <DashboardsListPage />,
        loader: dashboardsLoader,
      },
      {
        path: 'dashboards/:id',
        element: <DashboardDetailPage />,
        loader: dashboardDetailLoader,
      },
      {
        path: 'database',
        element: <DatabasePage />,
        loader: databaseLoader,
      },
    ],
  },
]);
