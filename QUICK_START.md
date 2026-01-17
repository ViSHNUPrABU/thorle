# Monithor - Quick Start Guide

## What is Monithor?

Monithor is a **config-driven observability dashboard** framework that renders monitoring UIs entirely from backend API responses. The frontend is 100% dynamic - add/modify dashboards without redeploying.

## Architecture

### Folder Structure

```
src/
├── pages/              # Feature pages (Dashboards, Database)
├── components/         # Base reusable components
├── routes/             # Route configuration
├── configs/            # Static configs
├── services/           # API, registry, context services
├── utils/              # Utilities
└── types/              # TypeScript types
```

### Key Components

1. **ComponentWrapper** - Universal wrapper for all components
   - Handles data fetching, loading/error/empty states
   - Supports visibility rules and caching

2. **LayoutBuilder** - Flexible layout system
   - `layoutType: 'flex-row' | 'flex-col'`
   - Equal width distribution for children

3. **DashboardGrid** - react-grid-layout wrapper
   - Drag & drop, resize widgets
   - LocalStorage persistence

4. **Chart, Table, Data** - Pure presentation components
   - Chart: ECharts integration
   - Table: Mantine React Table
   - Data: Stat/KPI/List layouts

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Mock API Server

```bash
npm run mock-api
```

This starts a mock API server on `http://localhost:3001` with endpoints:
- `GET /api/dashboards` - List dashboards
- `GET /api/dashboards/:id` - Get dashboard config
- `GET /api/database/metrics` - Get MySQL metrics

### 3. Start Development Server

In a separate terminal:

```bash
npm run dev
```

Or run both together:

```bash
npm run dev:full
```

### 4. Access the Application

Open http://localhost:5173

**Available Pages:**
- `/dashboards` - Dashboard list
- `/dashboards/infra-overview` - Infrastructure dashboard
- `/dashboards/app-metrics` - Application metrics
- `/database` - MySQL database monitoring

## Creating a New Dashboard

### Option 1: Static Configuration

Edit `src/configs/dashboards.ts`:

```typescript
{
  id: 'my-dashboard',
  title: 'My Dashboard',
  layout: [
    {
      id: 'widget-1',
      type: 'chart',
      title: 'My Chart',
      position: { x: 0, y: 0, w: 6, h: 4 },
      dataSource: {
        url: 'http://localhost:3001/api/metrics/cpu',
        method: 'GET',
        polling: { intervalMs: 15000 },
      },
      chartType: 'line',
      echartsOption: { /* ECharts config */ }
    }
  ]
}
```

### Option 2: API-Driven (Recommended)

1. Add endpoint to `mock-api-server.cjs`:

```javascript
dashboards['my-dashboard'] = {
  id: 'my-dashboard',
  title: 'My Dashboard',
  layout: [
    // Widget configs
  ]
};
```

2. Navigate to `/dashboards/my-dashboard`

The frontend automatically fetches the config from the API!

## Using LayoutBuilder

Create flexible layouts without grid positioning:

```typescript
import { LayoutBuilder } from './components/LayoutBuilder';

const config = {
  layoutType: 'flex-col',
  gap: '1rem',
  children: [
    {
      layoutType: 'flex-row',
      gap: '1rem',
      children: [
        {
          component: 'Data',
          componentProps: {
            data: { value: 42 },
            layout: 'stat',
            fields: [{ key: 'value', label: 'Connections' }]
          }
        },
        {
          component: 'Data',
          componentProps: {
            data: { value: 1250 },
            layout: 'stat',
            fields: [{ key: 'value', label: 'QPS' }]
          }
        }
      ]
    },
    {
      component: 'Chart',
      componentProps: {
        data: [...],
        chartType: 'line'
      }
    }
  ]
};

<LayoutBuilder config={config} />
```

## Adding a New Page

1. **Create page component** (`src/pages/MyFeature/MyPage.tsx`):

```typescript
import { useLoaderData } from 'react-router-dom';

export const MyPage = () => {
  const data = useLoaderData();
  return <div>{/* Your UI */}</div>;
};
```

2. **Add loader** (`src/services/apiService.ts`):

```typescript
export const myPageLoader = async () => {
  const response = await axios.get('/api/my-data');
  return response.data;
};
```

3. **Add route** (`src/router/routes.tsx`):

```typescript
{
  path: '/my-feature',
  element: <MyPage />,
  loader: myPageLoader,
}
```

4. **Register component** (`src/App.tsx`):

```typescript
import { MyPage } from './pages/MyFeature/MyPage';

registerBatch({
  // ...existing
  MyPage,
});
```

5. **Add navigation** (`src/App.tsx`):

```typescript
<NavBar items={[
  // ...existing
  { id: 'my-feature', label: 'My Feature', route: '/my-feature' },
]} />
```

## Widget Types

### Chart Widget

```typescript
{
  type: 'chart',
  chartType: 'line' | 'bar' | 'area' | 'gauge',
  echartsOption: { /* ECharts config */ },
  dataSource: { url: '/api/data' }
}
```

### Table Widget

```typescript
{
  type: 'table',
  columns: [
    { id: 'name', label: 'Name', sortable: true },
    { id: 'value', label: 'Value' }
  ],
  dataSource: { url: '/api/table-data' }
}
```

### Data Widget

```typescript
{
  type: 'data',
  layout: 'stat' | 'kpi' | 'list',
  fields: [
    { key: 'value', label: 'Total', format: 'number' }
  ],
  dataSource: { url: '/api/stats' }
}
```

## State Management

### Router Loaders (Initial Data)

```typescript
// Fetched once when route loads
export const dashboardLoader = async ({ params }) => {
  return fetchDashboardConfig(params.id);
};
```

### React-Query (Widget Data)

```typescript
// Used by ComponentWrapper
// Supports polling, caching, refetching
<ComponentWrapper
  component={Chart}
  dataSource={{ 
    url: '/api/metrics',
    polling: { intervalMs: 5000 }
  }}
/>
```

### Zustand (Cross-Widget State)

```typescript
// Share state between widgets
import { useContextStore } from './services/contextService';

const setFilter = useContextStore(state => state.setContext);
setFilter('selectedRegion', 'us-east-1');
```

## Data Fetching

### With ComponentWrapper

```typescript
<ComponentWrapper
  component={MyComponent}
  dataSource={{
    url: '/api/data',
    method: 'GET',
    polling: { intervalMs: 10000 },
    cacheTTL: 5000
  }}
  renderLoading={() => <div>Loading...</div>}
  renderError={(error, retry) => (
    <div>
      Error: {error.message}
      <button onClick={retry}>Retry</button>
    </div>
  )}
/>
```

### Direct API Call

```typescript
import { fetchWidgetData } from './services/apiService';

const data = await fetchWidgetData({
  url: '/api/data',
  method: 'GET'
});
```

## Custom Components

1. **Create component**:

```typescript
export const MyCustomComponent: React.FC<{ data: any }> = ({ data }) => {
  return <div>{JSON.stringify(data)}</div>;
};
```

2. **Register it**:

```typescript
registerComponent('MyCustomComponent', MyCustomComponent);
```

3. **Use in LayoutBuilder**:

```typescript
{
  component: 'MyCustomComponent',
  dataSource: { url: '/api/my-data' }
}
```

## Best Practices

1. **Use ComponentWrapper** for all data-fetching components
2. **Use LayoutBuilder** for flexible layouts
3. **Use DashboardGrid** when drag-and-drop is needed
4. **Keep components pure** - no data fetching logic inside
5. **Use loaders** for initial page data
6. **Use react-query** for widget polling/caching
7. **Register components** before using them in configs

## Troubleshooting

### Component not found error

Register the component in `App.tsx`:

```typescript
registerBatch({ MyComponent });
```

### Data not loading

Check:
1. Mock API server is running (`npm run mock-api`)
2. API endpoint exists in `mock-api-server.cjs`
3. CORS is enabled (already configured)

### TypeScript errors

Run type check:

```bash
npx tsc --noEmit
```

## Resources

- **ECharts Docs**: https://echarts.apache.org/en/option.html
- **Mantine Table**: https://www.mantine-react-table.com/
- **React Router**: https://reactrouter.com/
- **React Query**: https://tanstack.com/query/latest

## Support

For issues or questions, check `REFACTORING_SUMMARY.md` for detailed architecture documentation.
