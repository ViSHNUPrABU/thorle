// src/router/routes.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { DashboardListPage } from '../components/Dashboard/DashboardListPage';

/**
 * Routes configuration
 * Each dashboard route (/dash/:dashboardId) is tightly coupled to the API
 * The Dashboard component will fetch its complete config from /api/dashboards/:dashboardId
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboards" replace />,
  },
  {
    path: '/dashboards',
    element: <DashboardListPage />,
  },
  {
    path: '/dash/:dashboardId',
    element: <Dashboard />,
  },
]);
