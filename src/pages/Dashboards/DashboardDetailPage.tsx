// src/pages/Dashboards/DashboardDetailPage.tsx
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import type { DashboardApiResponse } from '../../types/config';
import { DashboardGrid } from '../../components/DashboardGrid';

export const DashboardDetailPage: React.FC = () => {
  const config = useLoaderData() as DashboardApiResponse;

  return <DashboardGrid config={config} />;
};
