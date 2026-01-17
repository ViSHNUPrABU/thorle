// src/components/NavBar/NavBarLayout.tsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { StaticLayoutConfig } from '../../types/config';
import { StaticLayout, registerComponent } from '../Layout/StaticLayout';
import { DashboardListPage } from '../Dashboard/DashboardListPage';
import { DashboardLayout } from '../Layout/DashboardLayout';
import { appConfig } from '../../configs/dashboards';

// Register components for StaticLayout
registerComponent('DashboardListPage', DashboardListPage);
registerComponent('DashboardLayout', DashboardLayout);

interface DashboardPageProps {
  dashboardId?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ dashboardId }) => {
  const params = useParams<{ dashboardId: string }>();
  const id = dashboardId || params.dashboardId;
  
  if (!id) {
    return <DashboardListPage />;
  }

  const dashboardConfig = appConfig.dashboards.find(d => d.id === id);
  
  if (!dashboardConfig) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
      }}>
        <h2 style={{ color: '#d32f2f', marginBottom: '1rem' }}>Dashboard Not Found</h2>
        <p style={{ color: '#666' }}>The dashboard "{id}" does not exist.</p>
      </div>
    );
  }
  
  return <DashboardLayout config={dashboardConfig} />;
};

registerComponent('DashboardPage', DashboardPage);

interface NavBarLayoutProps {
  layoutConfig?: StaticLayoutConfig;
}

export const NavBarLayout: React.FC<NavBarLayoutProps> = ({ layoutConfig }) => {
  const [selectedNavItem, setSelectedNavItem] = useState<string | null>('dashboards');

  // Default layout if none provided
  const defaultLayout: StaticLayoutConfig = {
    direction: 'column',
    style: { height: '100vh', width: '100%' },
    children: [
      // Top navbar
      {
        height: '60px',
        direction: 'row',
        style: {
          background: '#1e1e1e',
          color: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          alignItems: 'center',
          padding: '0 1.5rem',
        },
        children: [
          {
            component: 'AppTitle',
            width: 'auto',
          },
          {
            component: 'NavMenu',
          },
        ],
      },
      // Main content area with sidebar
      {
        direction: 'row',
        style: { overflow: 'hidden' },
        children: [
          // Left sidebar
          {
            width: '200px',
            direction: 'column',
            style: {
              background: '#f5f5f5',
              borderRight: '1px solid #e0e0e0',
              padding: '1rem 0',
            },
            children: appConfig.nav.map(item => ({
              component: 'NavItem',
              props: { 
                item,
                isSelected: selectedNavItem === item.id,
                onSelect: () => setSelectedNavItem(item.id),
              },
            })),
          },
          // Right content area
          {
            component: selectedNavItem === 'dashboards' ? 'DashboardListPage' : 'DashboardPage',
          },
        ],
      },
    ],
  };

  return <StaticLayout config={layoutConfig || defaultLayout} />;
};

// Individual components for the navbar
const AppTitle: React.FC = () => (
  <div style={{ 
    fontSize: '1.25rem', 
    fontWeight: 600,
    marginRight: '2rem',
  }}>
    Monithor
  </div>
);

const NavMenu: React.FC = () => (
  <div style={{ 
    display: 'flex', 
    gap: '1.5rem',
    alignItems: 'center',
  }}>
    <Link
      to="/dashboards"
      style={{
        color: 'white',
        textDecoration: 'none',
        fontSize: '0.9rem',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      Dashboards
    </Link>
  </div>
);

interface NavItemProps {
  item: { id: string; label: string };
  isSelected: boolean;
  onSelect: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, isSelected, onSelect }) => (
  <div
    onClick={onSelect}
    style={{
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      background: isSelected ? '#e3f2fd' : 'transparent',
      borderLeft: isSelected ? '3px solid #1976d2' : '3px solid transparent',
      fontWeight: isSelected ? 600 : 400,
      color: isSelected ? '#1976d2' : '#333',
      transition: 'all 0.2s',
    }}
    onMouseEnter={(e) => {
      if (!isSelected) {
        e.currentTarget.style.background = '#f0f0f0';
      }
    }}
    onMouseLeave={(e) => {
      if (!isSelected) {
        e.currentTarget.style.background = 'transparent';
      }
    }}
  >
    {item.label}
  </div>
);

// Register navbar components
registerComponent('AppTitle', AppTitle);
registerComponent('NavMenu', NavMenu);
registerComponent('NavItem', NavItem);
