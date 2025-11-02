// src/router/routes.tsx
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { appConfig } from '../configs/dashboards';

// Dashboard page component
const DashboardPage: React.FC<{ dashboardId: string }> = ({ dashboardId }) => {
  const dashboardConfig = appConfig.dashboards.find(d => d.id === dashboardId);
  
  if (!dashboardConfig) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <h2 style={{ color: '#d32f2f', marginBottom: '1rem' }}>Dashboard Not Found</h2>
        <p style={{ color: '#666' }}>The dashboard "{dashboardId}" does not exist.</p>
      </div>
    );
  }
  
  return <Dashboard config={dashboardConfig} />;
};

// Dashboards list page
const DashboardsListPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Dashboards</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {appConfig.dashboards.map(dashboard => (
          <a
            key={dashboard.id}
            href={`/dash/${dashboard.id}`}
            style={{
              display: 'block',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textDecoration: 'none',
              color: '#333',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
              {dashboard.title}
            </h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>
              {dashboard.layout.length} widgets
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboards" replace />,
  },
  {
    path: '/dashboards',
    element: <DashboardsListPage />,
  },
  {
    path: '/dash/:dashboardId',
    element: <DashboardPageWrapper />,
  },
]);

// Wrapper to extract route params
function DashboardPageWrapper() {
  const dashboardId = window.location.pathname.split('/dash/')[1];
  return <DashboardPage dashboardId={dashboardId} />;
}
