// src/configs/advancedExample.ts
// This file demonstrates advanced config-driven UI patterns
// Copy sections from here into dashboards.ts to try them out

import type { AppConfig } from '../types/config';

/**
 * Example 1: Navbar with embedded widgets showing live stats
 * Demonstrates: percentage-based widths, no IDs needed
 */
export const navbarWithWidgets: AppConfig = {
  nav: [{ id: 'dashboards', label: 'Dashboards' }],
  navLayout: {
    direction: 'column',
    style: { height: '100vh', width: '100%' },
    children: [
      {
        height: '60px',
        direction: 'row',
        style: {
          background: '#1e1e1e',
          color: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          alignItems: 'center',
          padding: '0 1.5rem',
          gap: '1rem',
        },
        children: [
          {
            component: 'AppTitle',
            width: '15%', // Title takes 15%
          },
          // Live CPU widget
          {
            width: '120px', // Fixed width widget
            widgetConfig: {
              id: 'navbar-cpu',
              type: 'data',
              layout: 'stat',
              fields: [{ key: 'userId', label: 'CPU', format: 'percent' }],
              dataSource: {
                url: 'https://jsonplaceholder.typicode.com/posts/1',
                polling: { intervalMs: 5000 },
              },
            },
          },
          // Live Memory widget
          {
            width: '120px', // Fixed width widget
            widgetConfig: {
              id: 'navbar-memory',
              type: 'data',
              layout: 'stat',
              fields: [{ key: 'id', label: 'Memory', format: 'percent' }],
              dataSource: {
                url: 'https://jsonplaceholder.typicode.com/posts/1',
                polling: { intervalMs: 5000 },
              },
            },
          },
          // Remaining space automatically filled
        ],
      },
      {
        direction: 'row',
        style: { overflow: 'hidden' },
        children: [
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
                props: { itemId: 'dashboards', label: 'Dashboards' },
              },
            ],
          },
          {
            component: 'ContentArea',
            // No width specified = takes remaining space
          },
        ],
      },
    ],
  },
  dashboards: [],
};

/**
 * Example 2: Three-column layout with widgets in sidebar
 * Demonstrates: Fixed left sidebar, auto content, fixed right sidebar with 25% width
 */
export const threeColumnLayout: AppConfig = {
  nav: [{ id: 'dashboards', label: 'Dashboards' }],
  navLayout: {
    direction: 'column',
    style: { height: '100vh' },
    children: [
      {
        height: '60px',
        direction: 'row',
        style: { background: '#1e1e1e', color: 'white', padding: '0 1.5rem', alignItems: 'center' },
        children: [{ component: 'AppTitle' }],
      },
      {
        direction: 'row',
        style: { overflow: 'hidden' },
        children: [
          // Left sidebar - 15% width
          {
            width: '15%',
            direction: 'column',
            style: { background: '#f5f5f5', borderRight: '1px solid #e0e0e0', padding: '1rem 0' },
            children: [
              {
                component: 'SidebarNavItem',
                props: { itemId: 'dashboards', label: 'Dashboards' },
              },
            ],
          },
          // Main content - takes remaining space (60%)
          {
            component: 'ContentArea',
          },
          // Right sidebar with widgets - 25% width
          {
            width: '25%',
            direction: 'column',
            style: {
              background: '#fafafa',
              borderLeft: '1px solid #e0e0e0',
              padding: '1rem',
              gap: '1rem',
              overflow: 'auto',
            },
            children: [
              {
                height: '150px',
                widgetConfig: {
                  id: 'right-gauge',
                  type: 'chart',
                  title: 'Health Score',
                  chartType: 'gauge',
                  echartsOption: {
                    series: [{
                      type: 'gauge',
                      data: [{ value: 85, name: 'Health' }],
                      detail: { formatter: '{value}%' },
                    }],
                  },
                },
              },
              {
                widgetConfig: {
                  id: 'right-list',
                  type: 'data',
                  title: 'Recent Events',
                  layout: 'list',
                  fields: [
                    { key: 'id', label: 'Event ID' },
                    { key: 'title', label: 'Description' },
                  ],
                  dataSource: {
                    url: 'https://jsonplaceholder.typicode.com/posts?_limit=5',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  dashboards: [],
};

/**
 * Example 3: Dashboard with mixed static and grid layouts
 * Demonstrates: Top KPI bar (equal 33.33% each), grid dashboard below
 */
export const mixedLayoutDashboard: AppConfig = {
  nav: [{ id: 'dashboards', label: 'Dashboards' }],
  navLayout: {
    direction: 'column',
    style: { height: '100vh' },
    children: [
      {
        height: '60px',
        direction: 'row',
        style: { background: '#1e1e1e', color: 'white', padding: '0 1.5rem', alignItems: 'center' },
        children: [{ component: 'AppTitle' }],
      },
      {
        direction: 'row',
        children: [
          {
            width: '200px',
            direction: 'column',
            style: { background: '#f5f5f5', borderRight: '1px solid #e0e0e0', padding: '1rem 0' },
            children: [
              {
                component: 'SidebarNavItem',
                props: { itemId: 'dashboards', label: 'Dashboards' },
              },
            ],
          },
          // Main content with static top section and grid below
          {
            direction: 'column',
            children: [
              // Top static section with 3 KPIs - each takes equal space
              {
                height: '120px',
                direction: 'row',
                style: {
                  background: 'white',
                  borderBottom: '1px solid #e0e0e0',
                  padding: '1rem',
                  gap: '1rem',
                },
                children: [
                  {
                    widgetConfig: {
                      id: 'kpi-1',
                      type: 'data',
                      layout: 'stat',
                      fields: [{ key: 'userId', label: 'Active Users', format: 'number' }],
                      dataSource: { url: 'https://jsonplaceholder.typicode.com/posts/1' },
                    },
                  },
                  {
                    widgetConfig: {
                      id: 'kpi-2',
                      type: 'data',
                      layout: 'stat',
                      fields: [{ key: 'id', label: 'Requests', format: 'number' }],
                      dataSource: { url: 'https://jsonplaceholder.typicode.com/posts/1' },
                    },
                  },
                  {
                    widgetConfig: {
                      id: 'kpi-3',
                      type: 'data',
                      layout: 'stat',
                      fields: [{ key: 'id', label: 'Errors', format: 'number' }],
                      dataSource: { url: 'https://jsonplaceholder.typicode.com/posts/1' },
                    },
                  },
                ],
              },
              // Bottom grid dashboard - takes remaining space
              {
                component: 'ContentArea',
              },
            ],
          },
        ],
      },
    ],
  },
  dashboards: [],
};

/**
 * Example 4: Minimalist single-column dashboard selector
 * Demonstrates: Narrow fixed sidebar (80px), rest is content
 */
export const minimalistLayout: AppConfig = {
  nav: [{ id: 'dashboards', label: 'Dashboards' }],
  navLayout: {
    direction: 'row',
    style: { height: '100vh' },
    children: [
      // Narrow left sidebar
      {
        width: '80px',
        direction: 'column',
        style: {
          background: '#263238',
          color: 'white',
          padding: '1rem 0',
          alignItems: 'center',
          gap: '1rem',
        },
        children: [
          {
            component: 'SidebarNavItem',
            props: { itemId: 'dashboards', label: '📊' }, // Using emoji as icon
          },
        ],
      },
      // Full-width content - takes remaining space
      {
        component: 'ContentArea',
      },
    ],
  },
  dashboards: [],
};

/**
 * Example 5: Status bar at bottom
 * Demonstrates: Fixed top (60px), flex middle, fixed bottom (40px)
 */
export const layoutWithStatusBar: AppConfig = {
  nav: [{ id: 'dashboards', label: 'Dashboards' }],
  navLayout: {
    direction: 'column',
    style: { height: '100vh' },
    children: [
      // Top navbar
      {
        height: '60px',
        direction: 'row',
        style: { background: '#1e1e1e', color: 'white', padding: '0 1.5rem', alignItems: 'center' },
        children: [{ component: 'AppTitle' }],
      },
      // Main content
      {
        direction: 'row',
        style: { overflow: 'hidden' },
        children: [
          {
            width: '200px',
            direction: 'column',
            style: { background: '#f5f5f5', borderRight: '1px solid #e0e0e0', padding: '1rem 0' },
            children: [
              {
                component: 'SidebarNavItem',
                props: { itemId: 'dashboards', label: 'Dashboards' },
              },
            ],
          },
          {
            component: 'ContentArea',
          },
        ],
      },
      // Bottom status bar with widgets
      {
        height: '40px',
        direction: 'row',
        style: {
          background: '#e0e0e0',
          padding: '0 1rem',
          alignItems: 'center',
          gap: '2rem',
          fontSize: '0.875rem',
        },
        children: [
          {
            width: 'auto',
            widgetConfig: {
              id: 'status-version',
              type: 'data',
              layout: 'stat',
              fields: [{ key: 'id', label: 'v' }],
              dataSource: { url: 'https://jsonplaceholder.typicode.com/posts/1' },
            },
          },
          {
            width: 'auto',
            widgetConfig: {
              id: 'status-users',
              type: 'data',
              layout: 'stat',
              fields: [{ key: 'userId', label: 'Users' }],
              dataSource: { url: 'https://jsonplaceholder.typicode.com/posts/1' },
            },
          },
        ],
      },
    ],
  },
  dashboards: [],
};

// Export all examples
export const examples = {
  navbarWithWidgets,
  threeColumnLayout,
  mixedLayoutDashboard,
  minimalistLayout,
  layoutWithStatusBar,
};
