# Monithor - Config-Driven Observability Dashboard

A production-ready, config-driven observability dashboard built with React, TypeScript, and Vite. Inspired by DataDog, this application provides a flexible, 100% configuration-driven approach to building monitoring dashboards.

## Features

- **100% Config-Driven**: Define dashboards, widgets, layouts, and data sources entirely through typed configuration files
- **Drag & Resize**: Interactive dashboard layout with react-grid-layout, with persistence to localStorage
- **Real-time Data**: Automatic polling, caching, and retry logic with react-query
- **Visibility Rules**: Context-based widget visibility with support for conditional rendering
- **Multiple Widget Types**:
  - **ChartWidget**: Line, Bar, Area, Gauge, and custom ECharts visualizations
  - **TableWidget**: Sortable tables with client-side sorting
  - **DataWidget**: Stat, KPI, and List layouts for displaying metrics
- **Global State Management**: Cross-widget context sharing with Zustand
- **URL Templating**: Dynamic API endpoints with context interpolation
- **Shareable URLs**: Dashboard routes with react-router
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

## Getting Started

### Installation

```bash
npm install
```

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
