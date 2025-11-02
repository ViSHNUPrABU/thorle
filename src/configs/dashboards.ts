// src/configs/dashboards.ts
import type { AppConfig } from '../types/config';

export const appConfig: AppConfig = {
  nav: [
    { id: 'dashboards', label: 'Dashboards' },
  ],
  navLayout: {
    direction: 'column',
    style: { height: '100vh', width: '100%' },
    children: [
      // Top navbar - fixed height
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
            width: '10%', // Take 10% of navbar width
          },
          // NavMenu takes remaining 90% automatically
        ],
      },
      // Main content area - takes remaining height
      {
        direction: 'row',
        style: { overflow: 'hidden' },
        children: [
          // Left sidebar - fixed width
          {
            width: '200px',
            direction: 'column',
            style: {
              background: '#f5f5f5',
              borderRight: '1px solid #e0e0e0',
              padding: '1rem 0',
            },
            children: [
              {
                component: 'SidebarNavItem',
                props: { 
                  itemId: 'dashboards',
                  label: 'Dashboards',
                  path: '/dashboards',
                },
              },
            ],
          },
          // Right content area - takes remaining width automatically
          {
            component: 'ContentArea',
            props: {
              defaultPath: '/dashboards',
            },
            routes: [
              { path: '/dashboards', component: 'DashboardListPage' },
              { path: '/dash/:dashboardId', component: 'Dashboard' },
            ],
          },
        ],
      },
    ],
  },
  dashboards: [
    // Dashboard configs are now fetched from the API
    // This can be kept for fallback or removed
  ],
};
