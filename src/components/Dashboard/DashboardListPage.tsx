// src/components/Dashboard/DashboardListPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { appConfig } from '../../configs/dashboards';

export const DashboardListPage: React.FC = () => {
  return (
    <div style={{ 
      padding: '2rem',
      background: '#fafafa',
      height: '100%',
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
        {appConfig.dashboards.map(dashboard => (
          <Link
            key={dashboard.id}
            to={`/dash/${dashboard.id}`}
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
              {dashboard.layout.length} widgets
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
