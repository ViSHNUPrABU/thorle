# Complete Example: Modern Dashboard Layout

## The Goal
Create a modern dashboard with:
- Fixed navbar (60px) with logo (10%) and stats widgets
- Sidebar (20%) with navigation
- Main content area (auto)
- Right panel (300px) with live widgets
- Status bar (40px) at bottom

## The Config (D3-Like)

```typescript
export const modernDashboard: AppConfig = {
  nav: [{ id: 'home', label: 'Home' }],
  navLayout: {
    direction: 'column',
    children: [
      // TOP NAVBAR - Fixed 60px
      {
        height: '60px',
        direction: 'row',
        style: {
          background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          padding: '0 1.5rem',
          gap: '1rem',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
        children: [
          // Logo - 10%
          {
            component: 'AppTitle',
            width: '10%',
          },
          // CPU Widget - Fixed 120px
          {
            width: '120px',
            widgetConfig: {
              id: 'nav-cpu',
              type: 'data',
              layout: 'stat',
              fields: [{ key: 'userId', label: 'CPU', format: 'percent' }],
              dataSource: {
                url: 'https://jsonplaceholder.typicode.com/posts/1',
                polling: { intervalMs: 2000 },
              },
            },
          },
          // Memory Widget - Fixed 120px
          {
            width: '120px',
            widgetConfig: {
              id: 'nav-memory',
              type: 'data',
              layout: 'stat',
              fields: [{ key: 'id', label: 'RAM', format: 'percent' }],
              dataSource: {
                url: 'https://jsonplaceholder.typicode.com/posts/1',
                polling: { intervalMs: 2000 },
              },
            },
          },
          // Network Widget - Fixed 120px
          {
            width: '120px',
            widgetConfig: {
              id: 'nav-network',
              type: 'data',
              layout: 'stat',
              fields: [{ key: 'userId', label: 'NET', format: 'number' }],
              dataSource: {
                url: 'https://jsonplaceholder.typicode.com/posts/2',
                polling: { intervalMs: 2000 },
              },
            },
          },
          // Remaining space (flexible)
        ],
      },
      
      // MAIN CONTENT AREA - Takes remaining height
      {
        direction: 'row',
        style: { overflow: 'hidden', background: '#f5f7fa' },
        children: [
          // LEFT SIDEBAR - 20% width
          {
            width: '20%',
            direction: 'column',
            style: {
              background: '#2c3e50',
              color: 'white',
              padding: '1rem 0',
              boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
            },
            children: [
              {
                component: 'SidebarNavItem',
                props: { itemId: 'dashboards', label: '📊 Dashboards' },
              },
              {
                component: 'SidebarNavItem',
                props: { itemId: 'analytics', label: '📈 Analytics' },
              },
              {
                component: 'SidebarNavItem',
                props: { itemId: 'settings', label: '⚙️ Settings' },
              },
              // Alert widget in sidebar
              {
                style: { margin: '2rem 1rem 1rem 1rem' },
                widgetConfig: {
                  id: 'sidebar-alerts',
                  type: 'data',
                  title: 'Recent Alerts',
                  layout: 'list',
                  fields: [{ key: 'title', label: 'Alert' }],
                  dataSource: {
                    url: 'https://jsonplaceholder.typicode.com/posts?_limit=3',
                  },
                },
              },
            ],
          },
          
          // MAIN CONTENT - Takes remaining space (auto)
          {
            component: 'ContentArea',
          },
          
          // RIGHT PANEL - Fixed 300px
          {
            width: '300px',
            direction: 'column',
            style: {
              background: 'white',
              borderLeft: '1px solid #e0e0e0',
              padding: '1rem',
              gap: '1rem',
              overflow: 'auto',
              boxShadow: '-2px 0 8px rgba(0,0,0,0.05)',
            },
            children: [
              // Health Score Gauge - Fixed height
              {
                height: '200px',
                widgetConfig: {
                  id: 'health-gauge',
                  type: 'chart',
                  title: 'System Health',
                  chartType: 'gauge',
                  echartsOption: {
                    series: [{
                      type: 'gauge',
                      data: [{ value: 92, name: 'Health Score' }],
                      detail: { formatter: '{value}%' },
                      axisLine: {
                        lineStyle: {
                          color: [[0.3, '#f56c6c'], [0.7, '#e6a23c'], [1, '#67c23a']],
                        },
                      },
                    }],
                  },
                },
              },
              // Active Services - Fixed height
              {
                height: '150px',
                widgetConfig: {
                  id: 'services',
                  type: 'data',
                  title: 'Active Services',
                  layout: 'kpi',
                  fields: [
                    { key: 'userId', label: 'Running' },
                    { key: 'id', label: 'Stopped' },
                  ],
                  dataSource: {
                    url: 'https://jsonplaceholder.typicode.com/posts/1',
                  },
                },
              },
              // Recent Events - Takes remaining height
              {
                widgetConfig: {
                  id: 'events',
                  type: 'table',
                  title: 'Live Events',
                  columns: [
                    { id: 'id', label: 'Time' },
                    { id: 'title', label: 'Event' },
                  ],
                  dataSource: {
                    url: 'https://jsonplaceholder.typicode.com/posts?_limit=10',
                    polling: { intervalMs: 5000 },
                  },
                },
              },
            ],
          },
        ],
      },
      
      // BOTTOM STATUS BAR - Fixed 40px
      {
        height: '40px',
        direction: 'row',
        style: {
          background: '#34495e',
          color: 'white',
          padding: '0 1.5rem',
          alignItems: 'center',
          gap: '2rem',
          fontSize: '0.875rem',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        },
        children: [
          {
            width: 'auto',
            widgetConfig: {
              id: 'status-version',
              type: 'data',
              layout: 'stat',
              fields: [{ key: 'id', label: 'Version' }],
              dataSource: { url: 'https://jsonplaceholder.typicode.com/posts/1' },
            },
          },
          {
            width: 'auto',
            widgetConfig: {
              id: 'status-uptime',
              type: 'data',
              layout: 'stat',
              fields: [{ key: 'userId', label: 'Uptime (days)' }],
              dataSource: { url: 'https://jsonplaceholder.typicode.com/posts/1' },
            },
          },
          {
            width: 'auto',
            widgetConfig: {
              id: 'status-users',
              type: 'data',
              layout: 'stat',
              fields: [{ key: 'userId', label: 'Active Users' }],
              dataSource: { url: 'https://jsonplaceholder.typicode.com/posts/1' },
            },
          },
        ],
      },
    ],
  },
  dashboards: [],
};
```

## Visual Layout

```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo 10%] [CPU 120px] [RAM 120px] [NET 120px]    [Flex Space]    │ 60px
├─────────────┬──────────────────────────────────────┬───────────────┤
│             │                                      │               │
│  Sidebar    │                                      │  Right Panel  │
│    20%      │        Main Content                  │    300px      │
│             │          (Auto)                      │               │
│ ┌─────────┐ │                                      │ ┌───────────┐ │
│ │Dashboards│ │  [Dashboard Layout or List]         │ │  Health   │ │
│ │Analytics │ │                                      │ │  Gauge    │ │
│ │Settings │ │                                      │ ├───────────┤ │
│ ├─────────┤ │                                      │ │  Services │ │
│ │         │ │                                      │ ├───────────┤ │
│ │ Alerts  │ │                                      │ │           │ │
│ │         │ │                                      │ │  Events   │ │
│ │         │ │                                      │ │  (Auto)   │ │
│ └─────────┘ │                                      │ └───────────┘ │
├─────────────┴──────────────────────────────────────┴───────────────┤
│ Version: 1  │  Uptime: 45 days  │  Active Users: 1234              │ 40px
└────────────────────────────────────────────────────────────────────┘
```

## Size Breakdown

### Height Distribution:
- Navbar: `60px` (fixed)
- Main area: `calc(100vh - 100px)` (auto)
- Status bar: `40px` (fixed)

### Width Distribution (Main Area):
- Left sidebar: `20%`
- Main content: `calc(80% - 300px)` (auto)
- Right panel: `300px` (fixed)

### Navbar Width:
- Logo: `10%`
- CPU widget: `120px`
- RAM widget: `120px`
- NET widget: `120px`
- Remaining: `calc(90% - 360px)` (auto flex space)

### Right Panel Height:
- Health gauge: `200px`
- Services: `150px`
- Events table: `calc(100% - 350px - gaps)` (auto)

## Key Features

✅ **No manual calculations** - All sizes auto-computed  
✅ **Mix units** - percentages, pixels, and auto  
✅ **Responsive** - Percentages adapt to screen size  
✅ **Live widgets** - Embedded everywhere  
✅ **Clean structure** - No IDs, no types, just hierarchy  

## Try It!

To use this layout, add it to your `configs/dashboards.ts`:

```typescript
import { modernDashboard } from './modernExample';

export const appConfig = modernDashboard;
```

Then watch your entire UI render from this one config object! 🎉
