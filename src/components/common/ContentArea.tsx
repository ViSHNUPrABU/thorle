// src/components/common/ContentArea.tsx
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dashboard';
import { DashboardListPage } from '../Dashboard/DashboardListPage';

// A simple component registry for route elements
const routeComponentRegistry: Record<string, React.ComponentType<any>> = {
  DashboardListPage,
  Dashboard,
};

interface ContentAreaProps {
  routes?: { path: string; component: string }[];
  defaultPath?: string;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ routes, defaultPath = '/' }) => {
  const generatedRoutes = routes?.map(route => {
    const Component = routeComponentRegistry[route.component];
    return {
      path: route.path,
      element: Component ? <Component /> : <Navigate to={defaultPath} replace />,
    };
  }) || [];

  // Add a default route
  generatedRoutes.push({
    path: '/',
    element: <Navigate to={defaultPath} replace />,
  });
  
  const element = useRoutes(generatedRoutes);

  return element;
};
