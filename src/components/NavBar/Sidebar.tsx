// src/components/NavBar/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { DashboardConfig } from '../../types/config';

interface SidebarProps {
  dashboards: DashboardConfig[];
}

export const Sidebar: React.FC<SidebarProps> = ({ dashboards }) => {
  const location = useLocation();
  
  return (
    <aside style={{
      width: '250px',
      background: '#f5f5f5',
      borderRight: '1px solid #e0e0e0',
      padding: '1rem 0',
      height: 'calc(100vh - 60px)',
      overflowY: 'auto',
    }}>
      <div style={{ padding: '0 1rem' }}>
        <h3 style={{ 
          margin: '0 0 1rem 0', 
          fontSize: '0.875rem', 
          fontWeight: 600,
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Dashboards
        </h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: 0,
        }}>
          {dashboards.map(dashboard => {
            const isActive = location.pathname === `/dash/${dashboard.id}`;
            return (
              <li key={dashboard.id} style={{ marginBottom: '0.25rem' }}>
                <Link
                  to={`/dash/${dashboard.id}`}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: isActive ? '#1976d2' : '#333',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    background: isActive ? '#e3f2fd' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#f0f0f0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {dashboard.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
