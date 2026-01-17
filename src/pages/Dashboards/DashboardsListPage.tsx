// src/pages/Dashboards/DashboardsListPage.tsx
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

interface DashboardItem {
  id: string;
  title: string;
  meta?: Record<string, any>;
  widgetCount?: number;
}

export const DashboardsListPage: React.FC = () => {
  const dashboards = useLoaderData() as DashboardItem[];

  return (
    <div style={{
      padding: '2rem',
      background: '#fafafa',
      minHeight: '100%',
      overflow: 'auto',
    }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 600 }}>
        Dashboards
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {dashboards.map(dashboard => (
          <Link
            key={dashboard.id}
            to={`/dashboards/${dashboard.id}`}
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
            <h3 style={{
              margin: '0 0 0.5rem 0',
              fontSize: '1.125rem',
              fontWeight: 600,
            }}>
              {dashboard.title}
            </h3>
            <p style={{
              margin: 0,
              fontSize: '0.875rem',
              color: '#666',
            }}>
              {dashboard.widgetCount || 0} widgets
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
