# API-Driven Dashboard Configuration

## Overview

Your dashboard is now fully API-driven! Each route (`/dash/:dashboardId`) is tightly coupled to an API endpoint that returns the complete dashboard configuration, including all widgets.

## How It Works

### 1. Route → API Mapping

When a user navigates to `/dash/my-dashboard`, the system:
- Extracts `dashboardId` from the route parameter
- Calls `GET /api/dashboards/my-dashboard`
- Renders the entire UI from the API response

### 2. API Endpoint

**Endpoint:** `GET /api/dashboards/:dashboardId`

**Response Format:**
```json
{
  "id": "infra-overview",
  "title": "Infrastructure Overview",
  "layout": [
    {
      "id": "cpu-chart",
      "type": "chart",
      "title": "CPU Usage",
      "position": { "x": 0, "y": 0, "w": 6, "h": 4 },
      "dataSource": {
        "url": "https://api.example.com/metrics/cpu",
        "method": "GET",
        "polling": { "intervalMs": 15000 },
        "cacheTTL": 5000
      },
      "chartType": "line",
      "echartsOption": {
        "title": { "text": "CPU Usage", "left": "center" },
        "tooltip": { "trigger": "axis" },
        "xAxis": { "type": "category", "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
        "yAxis": { "type": "value", "name": "Usage %" },
        "series": [{
          "data": [45, 52, 48, 65, 58, 62, 55],
          "type": "line",
          "smooth": true,
          "areaStyle": {}
        }]
      }
    },
    {
      "id": "memory-gauge",
      "type": "chart",
      "title": "Memory Usage",
      "position": { "x": 6, "y": 0, "w": 3, "h": 4 },
      "chartType": "gauge",
      "echartsOption": {
        "series": [{
          "type": "gauge",
          "data": [{ "value": 72, "name": "Memory" }],
          "detail": { "formatter": "{value}%" }
        }]
      }
    }
  ],
  "meta": {
    "description": "Main infrastructure monitoring dashboard",
    "tags": ["infrastructure", "monitoring"]
  }
}
```

### 3. Code Flow

```
User navigates to /dash/infra-overview
         ↓
Dashboard component extracts dashboardId from route params
         ↓
useDashboardConfig() hook fetches from /api/dashboards/infra-overview
         ↓
API returns complete config with all widgets
         ↓
DashboardLayout renders the entire dashboard from config
         ↓
Each widget fetches its own data using the dataSource in config
```

## Implementation Details

### Type Definition (`src/types/config.ts`)
```typescript
export type DashboardApiResponse = {
  id: string;
  title: string;
  layout: WidgetConfig[];  // Array of complete widget configs
  meta?: Record<string, any>;
};
```

### API Service (`src/services/apiService.ts`)
```typescript
export async function fetchDashboardConfig(dashboardId: string): Promise<DashboardApiResponse> {
  const response = await axios.get(`/api/dashboards/${dashboardId}`);
  return response.data;
}

export function useDashboardConfig(dashboardId: string | undefined) {
  return useQuery({
    queryKey: ['dashboard-config', dashboardId],
    queryFn: () => fetchDashboardConfig(dashboardId!),
    enabled: !!dashboardId,
    staleTime: 60000,
  });
}
```

### Dashboard Component (`src/components/Dashboard/Dashboard.tsx`)
```typescript
export const Dashboard: React.FC = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const { data: config, isLoading, error } = useDashboardConfig(dashboardId);
  
  if (isLoading) return <Loading />;
  if (error) return <ErrorDisplay message={error.message} />;
  if (!config) return <div>Dashboard not found</div>;
  
  return <DashboardLayout config={config} />;
};
```

## Setting Up Your Backend

### Option 1: Mock Server (for development)

Create a mock API server to test this functionality:

```javascript
// server.js
const express = require('express');
const app = express();

const dashboards = {
  'infra-overview': {
    id: 'infra-overview',
    title: 'Infrastructure Overview',
    layout: [
      // ... widget configs
    ]
  },
  'app-metrics': {
    id: 'app-metrics',
    title: 'Application Metrics',
    layout: [
      // ... widget configs
    ]
  }
};

app.get('/api/dashboards/:id', (req, res) => {
  const dashboard = dashboards[req.params.id];
  if (!dashboard) {
    return res.status(404).json({ error: 'Dashboard not found' });
  }
  res.json(dashboard);
});

app.listen(3001, () => console.log('Mock API running on port 3001'));
```

### Option 2: Vite Proxy (redirect to your real backend)

Update `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://your-backend-server:8080',
        changeOrigin: true,
      }
    }
  }
});
```

### Option 3: Use MSW (Mock Service Worker)

For client-side mocking during development:
```bash
npm install msw --save-dev
```

## Benefits

✅ **Complete API Control**: Backend fully controls what users see
✅ **Dynamic Updates**: Change dashboard configs without frontend deployment
✅ **Route Coupling**: Each route maps directly to an API endpoint
✅ **Single Source of Truth**: API config is the only source
✅ **Type Safety**: TypeScript ensures config matches expected format
✅ **Caching**: React Query caches configs for performance
✅ **Error Handling**: Built-in loading and error states

## Migration Path

If you currently have static configs in `src/configs/dashboards.ts`, you can:

1. Keep them as fallback/defaults
2. Export them via an API endpoint
3. Gradually migrate to full API-driven approach

## Example: Complete Widget Config

```json
{
  "id": "sales-table",
  "type": "table",
  "title": "Recent Sales",
  "position": { "x": 0, "y": 4, "w": 12, "h": 5 },
  "dataSource": {
    "url": "https://api.example.com/sales/recent",
    "method": "GET",
    "polling": { "intervalMs": 30000 }
  },
  "columns": [
    { "id": "date", "label": "Date", "sortable": true },
    { "id": "product", "label": "Product" },
    { "id": "amount", "label": "Amount", "render": "${value}" }
  ],
  "pagination": {
    "mode": "server",
    "pageSize": 10
  }
}
```

The widget automatically:
- Positions itself at x:0, y:4 (grid coordinates)
- Fetches data from the API every 30 seconds
- Renders a table with the specified columns
- Handles pagination

## Next Steps

1. Set up your backend API endpoint at `/api/dashboards/:id`
2. Return dashboard configs matching the `DashboardApiResponse` type
3. Navigate to `/dash/your-dashboard-id`
4. Watch the entire UI render from your API! 🎉
