# API-Driven Dashboard Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  React Application (Vite Dev Server: localhost:5173)      │ │
│  │                                                             │ │
│  │  ┌─────────────────────────────────────────────────────┐  │ │
│  │  │  Route: /dash/:dashboardId                          │  │ │
│  │  │  Component: <Dashboard />                           │  │ │
│  │  │                                                      │  │ │
│  │  │  - Extracts dashboardId from URL params            │  │ │
│  │  │  - Calls useDashboardConfig(dashboardId)           │  │ │
│  │  │  - Renders <DashboardLayout config={apiConfig} />  │  │ │
│  │  └─────────────────────────────────────────────────────┘  │ │
│  │                           ▲                                 │ │
│  │                           │                                 │ │
│  │                           │ API Response                    │ │
│  │                           │                                 │ │
│  │  ┌─────────────────────────────────────────────────────┐  │ │
│  │  │  API Service (apiService.ts)                        │  │ │
│  │  │                                                      │  │ │
│  │  │  fetchDashboardConfig(dashboardId)                  │  │ │
│  │  │    ↓                                                │  │ │
│  │  │  GET /api/dashboards/:dashboardId                   │  │ │
│  │  │                                                      │  │ │
│  │  │  React Query:                                       │  │ │
│  │  │  - Caching (60s)                                    │  │ │
│  │  │  - Retry (3x)                                       │  │ │
│  │  │  - Loading/Error states                            │  │ │
│  │  └─────────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                           │                                     │
│                           │ HTTP Request                        │
│                           ▼                                     │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ (Vite Proxy)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API SERVER                         │
│                   (localhost:3001 - mock)                       │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Endpoint: GET /api/dashboards/:dashboardId              │ │
│  │                                                            │ │
│  │  Request: GET /api/dashboards/infra-overview             │ │
│  │                                                            │ │
│  │  Response:                                                │ │
│  │  {                                                         │ │
│  │    "id": "infra-overview",                                │ │
│  │    "title": "Infrastructure Overview",                    │ │
│  │    "layout": [                                            │ │
│  │      {                                                     │ │
│  │        "id": "cpu-chart",                                 │ │
│  │        "type": "chart",                                   │ │
│  │        "title": "CPU Usage",                              │ │
│  │        "position": { "x": 0, "y": 0, "w": 6, "h": 4 },   │ │
│  │        "chartType": "line",                               │ │
│  │        "echartsOption": { ... },                          │ │
│  │        "dataSource": {                                    │ │
│  │          "url": "/api/metrics/cpu",                       │ │
│  │          "method": "GET",                                 │ │
│  │          "polling": { "intervalMs": 15000 }               │ │
│  │        }                                                   │ │
│  │      },                                                    │ │
│  │      { /* more widgets */ }                               │ │
│  │    ]                                                       │ │
│  │  }                                                         │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Widget Data Endpoints (called by rendered widgets)      │ │
│  │                                                            │ │
│  │  GET /api/metrics/cpu                                    │ │
│  │  GET /api/metrics/memory                                 │ │
│  │  GET /api/servers/status                                 │ │
│  │  ... etc                                                  │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow

### Initial Page Load

```
1. User navigates to: http://localhost:5173/dash/infra-overview
                                                      │
                                                      ▼
2. React Router matches route: /dash/:dashboardId
   - Extracts param: dashboardId = "infra-overview"
   - Renders: <Dashboard />
                                                      │
                                                      ▼
3. Dashboard component calls: useDashboardConfig("infra-overview")
                                                      │
                                                      ▼
4. React Query checks cache
   - Cache miss → fetch from API
   - Query key: ['dashboard-config', 'infra-overview']
                                                      │
                                                      ▼
5. API Service makes request:
   GET http://localhost:5173/api/dashboards/infra-overview
                                                      │
                                                      ▼
6. Vite proxy forwards to:
   GET http://localhost:3001/api/dashboards/infra-overview
                                                      │
                                                      ▼
7. Mock API Server responds with complete config
   {
     id: "infra-overview",
     title: "Infrastructure Overview",
     layout: [ /* widgets */ ]
   }
                                                      │
                                                      ▼
8. React Query caches response (60s TTL)
                                                      │
                                                      ▼
9. Dashboard component receives config
   - Renders: <DashboardLayout config={config} />
                                                      │
                                                      ▼
10. DashboardLayout renders grid
    - Creates GridLayout with widgets
    - Each widget wrapped in <WidgetWrapper />
                                                      │
                                                      ▼
11. Widgets mount and fetch their own data
    - ChartWidget: calls dataSource.url
    - TableWidget: calls dataSource.url
    - Each with their own polling intervals
```

### Navigation Between Dashboards

```
User clicks: /dash/app-metrics
                    │
                    ▼
React Router updates route
                    │
                    ▼
Dashboard re-renders with new dashboardId
                    │
                    ▼
useDashboardConfig("app-metrics")
                    │
                    ▼
React Query checks cache
                    │
                    ▼
If cached: instant render
If not: fetch from API → render
```

## Component Hierarchy

```
<App>
  └─ <QueryClientProvider>
      └─ <BrowserRouter>
          └─ <StaticLayout>  (nav/sidebar layout)
              └─ <Routes>
                  └─ <Route path="/dash/:dashboardId">
                      └─ <Dashboard>  ← Fetches config from API
                          └─ <DashboardLayout config={apiConfig}>
                              └─ <GridLayout>
                                  ├─ <WidgetWrapper config={widget1}>
                                  │   └─ <ChartWidget>  ← Fetches own data
                                  │
                                  ├─ <WidgetWrapper config={widget2}>
                                  │   └─ <TableWidget>  ← Fetches own data
                                  │
                                  └─ <WidgetWrapper config={widget3}>
                                      └─ <DataWidget>   ← Fetches own data
```

## Data Flow

### Dashboard Config (One-time per route)

```
Route Param → useDashboardConfig → React Query → API → Cache → Component
```

### Widget Data (Recurring with polling)

```
Widget Config → useWidgetData → React Query → API → Cache → Widget
                        ↑                                       │
                        │                                       │
                        └───────── polling interval ────────────┘
```

## Key Benefits

1. **Route-API Coupling**: `/dash/X` always fetches from `GET /api/dashboards/X`
2. **Single Source of Truth**: API config controls everything
3. **No Frontend Deployment**: Add/modify dashboards by changing API only
4. **Type Safety**: TypeScript validates API responses
5. **Performance**: React Query caching reduces API calls
6. **Real-time**: Widgets can poll independently

## Configuration Separation

```
┌──────────────────────────────────────────────────────┐
│              DASHBOARD CONFIG (from API)             │
│  - Layout structure                                  │
│  - Widget positions                                  │
│  - Widget types                                      │
│  - Data source URLs                                  │
│  - Chart configurations                              │
│  - Table columns                                     │
│                                                      │
│  Fetched: Once per route (cached 60s)              │
│  Endpoint: GET /api/dashboards/:id                  │
└──────────────────────────────────────────────────────┘
                          │
                          │ includes
                          ▼
┌──────────────────────────────────────────────────────┐
│           WIDGET DATA (from widget APIs)             │
│  - Actual metrics/data                               │
│  - Table rows                                        │
│  - Chart data points                                 │
│  - KPI values                                        │
│                                                      │
│  Fetched: Per widget (with individual polling)      │
│  Endpoints: Various (configured in widget config)   │
└──────────────────────────────────────────────────────┘
```

## Production Deployment

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│              │     │              │     │              │
│   Frontend   │────▶│   API Server │────▶│   Database   │
│   (Static)   │     │   (Backend)  │     │              │
│              │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
       │                     │
       │                     ├─ GET /api/dashboards/:id
       │                     ├─ GET /api/metrics/cpu
       │                     ├─ GET /api/servers/status
       │                     └─ ... more endpoints
       │
       └─ Nginx / CDN serves React build
```

## Summary

The architecture is designed for **maximum flexibility**:
- Routes determine which config to fetch
- API controls all UI rendering
- Widgets fetch their own data
- Everything is cached and optimized
- No frontend changes needed for new dashboards
