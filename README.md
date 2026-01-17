# Monithor

A powerful, **config-driven observability dashboard** framework for building dynamic monitoring interfaces. Create dashboards entirely from backend API responses - no frontend redeployment needed.

## ✨ Features

- 🎨 **Config-Driven UI** - Define dashboards via JSON/API
- 🔄 **Real-Time Updates** - Widget-level polling with react-query
- 📊 **Multiple Widget Types** - Charts (ECharts), Tables (Mantine), Stats/KPIs
- 🎯 **Flexible Layouts** - Grid-based (drag & drop) or FlexBox (LayoutBuilder)
- 🧩 **Component Registry** - Dynamic component resolution from config
- 📦 **Universal Wrapper** - Automatic data fetching, loading, error handling
- 🔍 **Visibility Rules** - Conditional widget rendering
- 💾 **Smart Caching** - Per-widget TTL, localStorage persistence
- 🎭 **Hybrid State** - Router loaders + react-query + Zustand
- 🚀 **TypeScript** - Full type safety

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              React Router                    │
│  (Initial Config Loading via Loaders)       │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           ComponentWrapper                   │
│  (Data Fetching, Loading, Error, Empty)     │
└─────────────────────────────────────────────┘
                    ↓
        ┌───────────┴───────────┐
        ↓                       ↓
┌───────────────┐      ┌───────────────┐
│ DashboardGrid │      │ LayoutBuilder │
│ (Drag & Drop) │      │ (FlexBox)     │
└───────────────┘      └───────────────┘
        ↓                       ↓
┌─────────────────────────────────────┐
│  Chart  │  Table  │  Data Widgets   │
└─────────────────────────────────────┘
```

## 🚀 Quick Start

### 1. Install

```bash
npm install
```

### 2. Start Mock API

```bash
npm run mock-api
```

### 3. Start Dev Server

```bash
npm run dev
```

Or run both together:

```bash
npm run dev:full
```

### 4. Open Browser

Visit http://localhost:5173

**Available Pages:**
- `/dashboards` - Dashboard list
- `/dashboards/infra-overview` - Infrastructure metrics
- `/dashboards/app-metrics` - Application metrics
- `/database` - MySQL database monitoring

## 📁 Project Structure

```
src/
├── pages/              # Feature pages (Dashboards, Database)
├── components/         # Reusable components
│   ├── Chart.tsx
│   ├── Table.tsx
│   ├── Data.tsx
│   ├── DashboardGrid.tsx
│   ├── LayoutBuilder.tsx
│   ├── ComponentWrapper.tsx
│   └── common/
├── routes/             # Route configuration
├── services/           # API, registry, context
├── configs/            # Static configurations
├── utils/              # Utility functions
└── types/              # TypeScript types
```

## 📊 Creating Dashboards

### API-Driven (Recommended)

Add to `mock-api-server.cjs`:

```javascript
dashboards['my-dashboard'] = {
  id: 'my-dashboard',
  title: 'My Dashboard',
  layout: [
    {
      id: 'cpu-chart',
      type: 'chart',
      title: 'CPU Usage',
      position: { x: 0, y: 0, w: 6, h: 4 },
      chartType: 'line',
      dataSource: {
        url: 'http://localhost:3001/api/metrics/cpu',
        polling: { intervalMs: 5000 }
      },
      echartsOption: {
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
        yAxis: { type: 'value' },
        series: [{ data: [45, 52, 48], type: 'line' }]
      }
    }
  ]
};
```

Navigate to `/dashboards/my-dashboard` - done! ✨

### Using LayoutBuilder

For flexible layouts without grid positioning:

```typescript
const config = {
  layoutType: 'flex-row',
  gap: '1rem',
  children: [
    {
      component: 'Data',
      componentProps: {
        data: { value: 42 },
        layout: 'stat',
        fields: [{ key: 'value', label: 'Active Users' }]
      }
    },
    {
      component: 'Chart',
      componentProps: {
        chartType: 'line',
        data: [...]
      }
    }
  ]
};

<LayoutBuilder config={config} />
```

## 🔧 Widget Types

### Chart Widget

```typescript
{
  type: 'chart',
  chartType: 'line' | 'bar' | 'area' | 'gauge',
  echartsOption: { /* ECharts configuration */ }
}
```

### Table Widget

```typescript
{
  type: 'table',
  columns: [
    { id: 'name', label: 'Name', sortable: true },
    { id: 'status', label: 'Status' }
  ]
}
```

### Data Widget

```typescript
{
  type: 'data',
  layout: 'stat' | 'kpi' | 'list',
  fields: [
    { key: 'value', label: 'Total', format: 'number' }
  ]
}
```

## 🎯 Key Components

### ComponentWrapper

Universal wrapper for any component with built-in:
- Data fetching (react-query)
- Loading/error/empty states
- Visibility rules
- Cache management

```tsx
<ComponentWrapper
  component={MyComponent}
  dataSource={{ url: '/api/data', polling: { intervalMs: 5000 } }}
  renderLoading={() => <CustomLoader />}
/>
```

### LayoutBuilder

Flexible layout system:

```tsx
<LayoutBuilder
  config={{
    layoutType: 'flex-col',
    gap: '1rem',
    children: [/* layout items */]
  }}
/>
```

### DashboardGrid

Grid-based dashboard with drag & drop:

```tsx
<DashboardGrid
  config={{
    id: 'my-dashboard',
    title: 'My Dashboard',
    layout: [/* widgets */]
  }}
/>
```

## 🔄 State Management

**Router Loaders** → Initial page data  
**React Query** → Widget data with polling/caching  
**Zustand** → Cross-widget state sharing

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router 7** - Routing with loaders
- **TanStack Query** - Data fetching
- **Zustand** - State management
- **ECharts** - Charting library
- **Mantine** - UI components
- **react-grid-layout** - Drag & drop grids

## 📚 Documentation

- [Quick Start Guide](./QUICK_START.md) - Detailed setup and usage
- [Refactoring Summary](./REFACTORING_SUMMARY.md) - Architecture details

## 🧪 Testing

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build
npm run build
```

## 🤝 Contributing

1. Follow the folder structure
2. Use ComponentWrapper for data-fetching components
3. Register new components in App.tsx
4. Add loaders for new pages
5. Keep components pure (no data fetching logic)

## 📄 License

MIT

---

**Built with ❤️ for modern observability**
