# Monithor - API-Driven Observability Dashboard

A production-ready, 100% API-driven observability dashboard built with React, TypeScript, and Vite. Every dashboard is rendered entirely from API-provided configuration, with routes tightly coupled to backend endpoints.

## 🚀 Key Feature: Fully API-Driven

**Each route fetches its complete configuration from your API!**

- Navigate to `/dash/my-dashboard`
- App calls `GET /api/dashboards/my-dashboard`
- Entire UI renders from the API response
- No frontend changes needed to add/modify dashboards

## Features

- **100% API-Driven**: Dashboards, widgets, layouts, and data sources all come from API
- **Tightly Coupled Routes**: Each route (`/dash/:id`) maps to an API endpoint
- **Drag & Resize**: Interactive dashboard layout with react-grid-layout, with persistence to localStorage
- **Real-time Data**: Automatic polling, caching, and retry logic with react-query
- **Multiple Widget Types**:
  - **ChartWidget**: Line, Bar, Area, Gauge, and custom ECharts visualizations
  - **TableWidget**: Sortable tables with client-side sorting
  - **DataWidget**: Stat, KPI, and List layouts for displaying metrics
- **Dynamic Updates**: Change dashboards without redeploying frontend
- **Global State Management**: Cross-widget context sharing with Zustand
- **URL Templating**: Dynamic API endpoints with context interpolation
- **Config Validation**: Runtime schema validation with ajv
- **Lazy Loading**: Code-splitting for heavy libraries (echarts, mantine)
- **TypeScript**: Full type safety across the application

## Tech Stack

### Core
- React 19
- TypeScript
- Vite

### State & Data
- `@tanstack/react-query` - Data fetching, caching, polling
- `axios` - HTTP client
- `zustand` - Global state management

### UI & Layout
- `react-grid-layout` - Draggable/resizable grid
- `echarts` + `echarts-for-react` - Charts
- `mantine-react-table` - Advanced tables (optional)
- `react-router-dom` - Routing

### Validation
- `ajv` - JSON schema validation

## Quick Start

### 1. Installation

```bash
npm install
npm install express cors  # For mock server
npm install -D concurrently  # Optional: run both servers together
```

### 2. Start Development Environment

```bash
# Option 1: Start both servers together
npm run dev:full

# Option 2: Start separately
# Terminal 1:
npm run mock-api

# Terminal 2:
npm run dev
```

### 3. Access Dashboards

Navigate to:
- http://localhost:5173/dash/infra-overview
- http://localhost:5173/dash/app-metrics

**That's it!** The dashboards render entirely from API configs.

## 📖 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup and customization guide
- **[API_DRIVEN_DASHBOARD.md](./API_DRIVEN_DASHBOARD.md)** - Architecture and API documentation
- **[API_IMPLEMENTATION_SUMMARY.md](./API_IMPLEMENTATION_SUMMARY.md)** - What changed and why
- **[EXAMPLE_API_RESPONSE.md](./EXAMPLE_API_RESPONSE.md)** - Complete API response examples

## How It Works

```
User visits: /dash/infra-overview
       ↓
Dashboard extracts: dashboardId = "infra-overview"
       ↓
API call: GET /api/dashboards/infra-overview
       ↓
API returns complete config with all widgets
       ↓
UI renders entirely from config
```

## API Endpoint

Your backend must implement:

```
GET /api/dashboards/:dashboardId
```

Response:
```json
{
  "id": "infra-overview",
  "title": "Infrastructure Overview",
  "layout": [
    {
      "id": "cpu-chart",
      "type": "chart",
      "chartType": "line",
      "position": { "x": 0, "y": 0, "w": 6, "h": 4 },
      "echartsOption": { /* ... */ }
    }
  ]
}
```

See [EXAMPLE_API_RESPONSE.md](./EXAMPLE_API_RESPONSE.md) for complete examples.

## Development

### Mock Server

A complete mock API server is included:

```bash
node mock-api-server.js
```

Provides:
- Dashboard config endpoints
- Widget data endpoints
- Example dashboards

### Creating a New Dashboard

Simply add to `mock-api-server.js`:

```javascript
const dashboards = {
  'my-dashboard': {
    id: 'my-dashboard',
    title: 'My Dashboard',
    layout: [/* widget configs */]
  }
};
```

Access at: `/dash/my-dashboard` - No frontend changes needed!

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  types/
    config.ts           # TypeScript type definitions
  services/
    apiService.ts       # react-query + axios integration
    contextService.ts   # Zustand store
    validation.ts       # ajv schema validation
  utils/
    templating.ts       # URL template interpolation
    visibility.ts       # Visibility rule evaluation
  components/
    common/
      Loading.tsx       # Loading state
      Empty.tsx         # Empty state
      Error.tsx         # Error state
    NavBar/
      NavBar.tsx        # Top navigation
      Sidebar.tsx       # Left sidebar
    Dashboard/
      Dashboard.tsx     # Main dashboard container
    Widget/
      WidgetWrapper.tsx # Widget data fetching & rendering
      ChartWidget.tsx   # Chart visualizations
      TableWidget.tsx   # Table widget
      DataWidget.tsx    # Data display widget
  configs/
    dashboards.ts       # Dashboard configurations
  router/
    routes.tsx          # React Router configuration
  App.tsx              # Main app component
  main.tsx             # Entry point
```

## Configuration Guide

### Creating a Dashboard

Dashboards are defined in `src/configs/dashboards.ts`. Example:

```typescript
{
  id: 'my-dashboard',
  title: 'My Dashboard',
  layout: [
    {
      id: 'cpu-chart',
      type: 'chart',
      title: 'CPU Usage',
      position: { x: 0, y: 0, w: 6, h: 4 },
      dataSource: {
        url: '/api/metrics/cpu',
        method: 'GET',
        polling: { intervalMs: 15000 },
      },
      chartType: 'line',
    },
  ],
}
```

### Widget Types

#### ChartWidget
```typescript
{ type: 'chart', chartType: 'line'|'bar'|'area'|'gauge' }
```

#### TableWidget
```typescript
{
  type: 'table',
  columns: [{ id: 'name', label: 'Name', sortable: true }]
}
```

#### DataWidget
```typescript
{
  type: 'data',
  layout: 'stat'|'kpi'|'list',
  fields: [{ key: 'uptime', format: 'number' }]
}
```

## License

MIT
