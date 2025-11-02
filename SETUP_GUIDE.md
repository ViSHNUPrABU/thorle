# API-Driven Dashboard - Quick Start Guide

## Overview

Your dashboard now fetches its complete configuration from an API! Each route is tightly coupled to an API endpoint that returns the entire dashboard config including all widgets.

## Setup Instructions

### Step 1: Install Dependencies

If using the mock server for development:

```bash
npm install express cors
npm install -D concurrently
```

### Step 2: Start the Mock API Server

In one terminal:
```bash
npm run mock-api
```

Or manually:
```bash
node mock-api-server.js
```

This starts the mock API on `http://localhost:3001`

### Step 3: Start the Vite Dev Server

In another terminal:
```bash
npm run dev
```

Or run both together:
```bash
npm run dev:full
```

### Step 4: Access Dashboards

Navigate to:
- `http://localhost:5173/dash/infra-overview` - Infrastructure dashboard
- `http://localhost:5173/dash/app-metrics` - Application metrics dashboard

## How It Works

### Route → API Flow

```
User visits: /dash/infra-overview
       ↓
Dashboard component extracts: dashboardId = "infra-overview"
       ↓
API call: GET /api/dashboards/infra-overview
       ↓
API returns complete config with all widgets
       ↓
UI renders entirely from config
```

### API Endpoint

**URL:** `GET /api/dashboards/:dashboardId`

**Response:**
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
      "chartType": "line",
      "echartsOption": { ... }
    }
  ]
}
```

## Customizing Dashboards

### Adding a New Dashboard

Edit `mock-api-server.js`:

```javascript
const dashboards = {
  'my-custom-dashboard': {
    id: 'my-custom-dashboard',
    title: 'My Custom Dashboard',
    layout: [
      {
        id: 'my-widget',
        type: 'chart',
        title: 'My Chart',
        position: { x: 0, y: 0, w: 6, h: 4 },
        chartType: 'line',
        echartsOption: {
          // Your ECharts config
        }
      }
    ]
  }
};
```

Access at: `http://localhost:5173/dash/my-custom-dashboard`

### Widget Types

1. **Chart Widget**
```json
{
  "id": "example-chart",
  "type": "chart",
  "chartType": "line" | "bar" | "gauge" | "heatmap",
  "echartsOption": { ... }
}
```

2. **Table Widget**
```json
{
  "id": "example-table",
  "type": "table",
  "columns": [
    { "id": "name", "label": "Name", "sortable": true }
  ],
  "dataSource": {
    "url": "/api/data/table",
    "method": "GET"
  }
}
```

3. **Data Widget (KPI)**
```json
{
  "id": "example-kpi",
  "type": "data",
  "layout": "kpi",
  "fields": [
    { "key": "value", "label": "Total", "format": "{value}" }
  ]
}
```

### Widget Positioning

Grid system (12 columns):
- `x`: Column position (0-11)
- `y`: Row position
- `w`: Width in columns (1-12)
- `h`: Height in rows

Example:
```json
"position": { "x": 0, "y": 0, "w": 6, "h": 4 }
```
Creates a widget at top-left, 6 columns wide, 4 rows tall.

## Using Your Real Backend

### Option 1: Update Vite Proxy

Edit `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://your-backend:8080',
        changeOrigin: true,
      },
    },
  },
});
```

### Option 2: Environment Variables

Create `.env`:
```
VITE_API_URL=http://your-backend:8080
```

Update `apiService.ts`:
```typescript
const API_URL = import.meta.env.VITE_API_URL || '';

export async function fetchDashboardConfig(dashboardId: string) {
  const response = await axios.get(`${API_URL}/api/dashboards/${dashboardId}`);
  return response.data;
}
```

## Backend API Requirements

Your backend must implement:

### 1. Dashboard Config Endpoint

```
GET /api/dashboards/:dashboardId

Response: DashboardApiResponse
{
  id: string;
  title: string;
  layout: WidgetConfig[];
  meta?: Record<string, any>;
}
```

### 2. Widget Data Endpoints

Each widget with `dataSource` will call its configured URL:

```
GET /api/metrics/cpu
GET /api/sales/recent
POST /api/custom-query
```

## Features

✅ **Tightly Coupled Routes**: Each route maps to a specific API endpoint
✅ **Complete API Control**: Backend defines entire dashboard structure
✅ **Dynamic Widgets**: All widgets and their configs come from API
✅ **Real-time Updates**: Widgets can poll their own data sources
✅ **Type Safety**: Full TypeScript support
✅ **Caching**: React Query caches configs for performance
✅ **Error Handling**: Built-in loading and error states

## File Structure

```
src/
  services/
    apiService.ts          # API calls and React Query hooks
  components/
    Dashboard/
      Dashboard.tsx        # Main component that fetches config
  types/
    config.ts             # TypeScript types for configs
  
mock-api-server.js        # Development mock server
vite.config.ts            # Proxy configuration
```

## Troubleshooting

### "Dashboard not found"
- Check that the dashboard ID in the URL matches an ID in your API
- Verify the mock server is running on port 3001
- Check browser console for API errors

### API not responding
- Ensure mock-api-server.js is running
- Check Vite proxy is configured correctly
- Verify CORS is enabled on your backend

### Widgets not loading
- Check widget `dataSource.url` is correct
- Verify the data format matches what the widget expects
- Look for errors in browser console

## Next Steps

1. ✅ Start the mock server
2. ✅ Test the example dashboards
3. ✅ Create your own dashboard configs
4. ✅ Connect to your real backend
5. ✅ Deploy to production!

## Production Deployment

For production:
1. Remove or disable the mock server
2. Configure API proxy or CORS
3. Build: `npm run build`
4. Serve the `dist` folder
5. Ensure your backend API is accessible

---

**Your dashboard is now 100% API-driven!** 🎉

Every aspect of the UI can be controlled via API responses, making it incredibly flexible and dynamic.
