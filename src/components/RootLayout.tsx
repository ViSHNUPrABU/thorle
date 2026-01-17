// src/components/RootLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export const RootLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <NavBar items={[
        { id: 'dashboards', label: 'Dashboards', route: '/dashboards' },
        { id: 'database', label: 'Database', route: '/database' },
      ]} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};
