// src/components/Dashboard/Dashboard.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDashboardConfig } from '../../services/apiService';
import { DashboardLayout } from '../Layout/DashboardLayout';
import { Loading } from '../common/Loading';
import { ErrorDisplay } from '../common/Error';

/**
 * Dashboard component that fetches its complete configuration from the API
 * The route param (dashId) is tightly coupled to the API endpoint
 */
export const Dashboard: React.FC = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  
  // Fetch complete dashboard config from API based on route parameter
  const { data: config, isLoading, error } = useDashboardConfig(dashboardId);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        minHeight: '400px',
      }}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <ErrorDisplay message={`Failed to load dashboard: ${(error as Error).message}`} />
      </div>
    );
  }

  if (!config) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Dashboard not found</p>
      </div>
    );
  }

  // Render the entire dashboard from the API-provided config
  return <DashboardLayout config={config} />;
};
