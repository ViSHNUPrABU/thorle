# Config-Driven UI Examples

## Example 1: Custom Navbar with Widgets

You can embed widgets directly in the navbar:

```typescript
{
  direction: 'row',
  style: { 
    background: '#1e1e1e', 
    color: 'white',
    height: '60px',
    padding: '0 1.5rem',
    alignItems: 'center'
  },
  items: [
    {
      type: 'component',
      component: 'AppTitle',
      width: 'auto'
    },
    {
      type: 'component',
      component: 'NavMenu',
      flex: 1
    },
    // Embed a live KPI widget in the navbar!
    {
      type: 'widget',
      width: '150px',
      widgetConfig: {
        id: 'navbar-cpu',
        type: 'data',
        layout: 'stat',
        fields: [{ key: 'value', label: 'CPU', format: 'percent' }],
        dataSource: {
          url: '/api/cpu/current',
          polling: { intervalMs: 5000 }
        }
      }
    },
    {
      type: 'widget',
      width: '150px',
      widgetConfig: {
        id: 'navbar-memory',
        type: 'data',
        layout: 'stat',
        fields: [{ key: 'value', label: 'Memory', format: 'percent' }],
        dataSource: {
          url: '/api/memory/current',
          polling: { intervalMs: 5000 }
        }
      }
    }
  ]
}
```

## Example 2: Dashboard Selector in Sidebar

Create a sidebar nav item that shows a specific dashboard when clicked:

```typescript
{
  nav: [
    {
      id: 'infra',
      label: 'Infrastructure',
      dashboardId: 'infra-overview' // Clicking this nav item renders this dashboard
    },
    {
      id: 'network',
      label: 'Network',
      dashboardId: 'network-monitoring'
    },
    {
      id: 'apps',
      label: 'Applications',
      dashboardId: 'application-metrics'
    }
  ]
}
```

## Example 3: Nested Layouts with Mixed Content

Create complex layouts with multiple levels of nesting:

```typescript
{
  direction: 'column',
  style: { height: '100vh' },
  items: [
    // Top bar with logo and stats
    {
      type: 'layout',
      height: '80px',
      direction: 'row',
      style: { background: '#1e1e1e', padding: '0 2rem', alignItems: 'center' },
      children: [
        { type: 'component', component: 'Logo', width: '200px' },
        {
          type: 'layout',
          direction: 'row',
          flex: 1,
          style: { gap: '1rem', justifyContent: 'flex-end' },
          children: [
            {
              type: 'widget',
              width: '120px',
              widgetConfig: { /* CPU widget */ }
            },
            {
              type: 'widget',
              width: '120px',
              widgetConfig: { /* Memory widget */ }
            },
            {
              type: 'widget',
              width: '120px',
              widgetConfig: { /* Disk widget */ }
            }
          ]
        }
      ]
    },
    // Main content area
    {
      type: 'layout',
      direction: 'row',
      flex: 1,
      children: [
        // Left sidebar - 3 sections stacked vertically
        {
          type: 'layout',
          width: '250px',
          direction: 'column',
          style: { background: '#f5f5f5' },
          children: [
            {
              type: 'component',
              component: 'NavSection',
              props: { title: 'Monitoring' },
              height: '200px'
            },
            {
              type: 'layout',
              flex: 1,
              direction: 'column',
              style: { padding: '1rem' },
              children: [
                {
                  type: 'widget',
                  widgetConfig: {
                    id: 'sidebar-alerts',
                    type: 'data',
                    title: 'Recent Alerts',
                    layout: 'list',
                    fields: [{ key: 'message', label: 'Alert' }],
                    dataSource: { url: '/api/alerts/recent' }
                  }
                }
              ]
            }
          ]
        },
        // Right content - 2 columns
        {
          type: 'layout',
          flex: 1,
          direction: 'row',
          children: [
            {
              type: 'component',
              component: 'DashboardPage',
              flex: 2
            },
            {
              type: 'layout',
              width: '300px',
              direction: 'column',
              style: { background: '#fafafa', padding: '1rem', gap: '1rem' },
              children: [
                {
                  type: 'widget',
                  height: '200px',
                  widgetConfig: {
                    id: 'side-chart',
                    type: 'chart',
                    chartType: 'gauge',
                    title: 'Health Score'
                  }
                },
                {
                  type: 'widget',
                  flex: 1,
                  widgetConfig: {
                    id: 'side-events',
                    type: 'table',
                    title: 'Live Events',
                    columns: [
                      { id: 'time', label: 'Time' },
                      { id: 'event', label: 'Event' }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    // Bottom status bar
    {
      type: 'layout',
      height: '30px',
      direction: 'row',
      style: { background: '#e0e0e0', padding: '0 1rem', alignItems: 'center' },
      children: [
        { type: 'component', component: 'StatusBar', flex: 1 }
      ]
    }
  ]
}
```

## Example 4: Conditional Rendering with Visibility Rules

Show/hide widgets based on context:

```typescript
{
  type: 'widget',
  widgetConfig: {
    id: 'admin-panel',
    type: 'data',
    title: 'Admin Controls',
    // Only visible when user role is admin
    visibility: [
      { contextKey: 'user.role', op: 'eq', value: 'admin' }
    ],
    // ...
  }
}
```

## Example 5: Dynamic Dashboard List

Create a nav item that shows all available dashboards:

```typescript
{
  nav: [
    {
      id: 'dashboards',
      label: 'Dashboards',
      // When clicked, shows DashboardListPage on the right
      rightWidgets: {
        direction: 'column',
        items: [
          {
            type: 'component',
            component: 'DashboardListPage'
          }
        ]
      }
    }
  ]
}
```

## Example 6: Split View with Multiple Dashboards

Show two dashboards side by side:

```typescript
{
  type: 'layout',
  direction: 'row',
  flex: 1,
  children: [
    {
      type: 'component',
      component: 'DashboardPage',
      props: { dashboardId: 'infra-overview' },
      flex: 1
    },
    {
      type: 'component',
      component: 'DashboardPage',
      props: { dashboardId: 'network-monitoring' },
      flex: 1
    }
  ]
}
```

## Example 7: Responsive Layout

Use flex and width to create responsive layouts:

```typescript
{
  direction: 'row',
  items: [
    // This will take 1/3 of space
    { type: 'component', component: 'Sidebar', flex: 1 },
    // This will take 2/3 of space
    { type: 'component', component: 'MainContent', flex: 2 }
  ]
}
```

## Example 8: Loading Config from API

```typescript
// In App.tsx
import { loadAppConfigWithFallback } from './utils/configLoader';
import { appConfig as fallbackConfig } from './configs/dashboards';

function App() {
  const [config, setConfig] = useState<AppConfig>(fallbackConfig);
  
  useEffect(() => {
    loadAppConfigWithFallback('/api/config', fallbackConfig)
      .then(setConfig)
      .catch(console.error);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {config.navLayout ? (
          <StaticLayout config={config.navLayout} />
        ) : (
          <div>Loading...</div>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

## Example 9: Per-Dashboard Custom Layouts

Each dashboard can have its own unique layout type:

```typescript
{
  dashboards: [
    {
      id: 'grid-dashboard',
      title: 'Grid Dashboard',
      layout: [ /* DashboardLayout with grid */ ]
    },
    // Future: Could add static layouts for dashboards too
    {
      id: 'static-dashboard',
      title: 'Static Dashboard',
      staticLayout: { /* StaticLayout config */ }
    }
  ]
}
```

## Example 10: Themed Widgets

Add theme configuration to widgets:

```typescript
{
  type: 'widget',
  widgetConfig: {
    id: 'themed-widget',
    type: 'chart',
    chartType: 'gauge',
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      padding: '1rem',
      color: 'white'
    }
  }
}
```
