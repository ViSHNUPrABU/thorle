// src/configs/dashboards.ts
import type { AppConfig } from '../types/config';

export const appConfig: AppConfig = {
  layout: {
    direction: 'column',
    style: { height: '100vh', width: '100vw', background: '#f0f2f5' },
    children: [
      // Top Navbar
      {
        height: '60px',
        direction: 'row',
        style: {
          background: 'white',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          alignItems: 'center',
          padding: '0 24px',
        },
        children: [
          { component: 'AppTitle' },
          // Can add NavMenu component here in the future
        ],
      },
      // Main Content
      {
        direction: 'row',
        children: [
          // Sidebar
          {
            width: '240px',
            direction: 'column',
            style: {
              background: 'white',
              borderRight: '1px solid #f0f0f0',
              padding: '16px 0',
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
              // Add more SidebarNavItems here
            ],
          },
          // Content Area
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
};
