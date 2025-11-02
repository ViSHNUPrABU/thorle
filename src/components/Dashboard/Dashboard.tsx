// src/components/Dashboard/Dashboard.tsx
import React from 'react';
import type { DashboardConfig } from '../../types/config';
import { DashboardLayout } from '../Layout/DashboardLayout';

interface DashboardProps {
  config: DashboardConfig;
}

// Legacy component - now just wraps DashboardLayout
export const Dashboard: React.FC<DashboardProps> = ({ config }) => {
  return <DashboardLayout config={config} />;
};
