# Monithor Refactoring Summary

## Overview
Complete architecture refactoring of Monithor with clean folder structure, universal ComponentWrapper, LayoutBuilder system, and Database monitoring page.

## Changes Implemented

### 1. Folder Structure Reorganization

**New Structure:**
```
src/
├── pages/                          # Feature pages
│   ├── Dashboards/
│   │   ├── DashboardsListPage.tsx
│   │   └── DashboardDetailPage.tsx
│   └── Database/
│       └── DatabasePage.tsx
├── components/                     # Base reusable components
│   ├── Chart.tsx
│   ├── Table.tsx
│   ├── Data.tsx
│   ├── DashboardGrid.tsx
│   ├── LayoutBuilder.tsx
│   ├── NavBar.tsx
│   ├── ComponentWrapper.tsx
│   └── common/
│       ├── Loading.tsx
│       ├── Error.tsx
│       └── Empty.tsx
├── routes/
│   └── routes.tsx
├── configs/
│   ├── dashboards.ts
│   └── advancedExample.ts
├── services/
│   ├── apiService.ts
│   ├── componentRegistry.ts
│   ├── contextService.ts
│   └── validation.ts
├── utils/
│   ├── configLoader.ts
│   ├── templating.ts
│   └── visibility.ts
└── types/
    └── config.ts
```

**Deleted:**
- All 20 `.md` documentation files
- `components/Dashboard/`, `components/Layout/`, `components/NavBar/`, `components/Widget/`
- Unused text files: `ex_config.txt`, `llm_sugg_req.txt`, `req.txt`

### 2. Core Components Created

#### ComponentWrapper (`components/ComponentWrapper.tsx`)
Universal wrapper component that handles:
- Data fetching with react-query integration
- Loading/error/empty state rendering (with custom render props support)
- Visibility evaluation
- Component registry resolution
- Cache management via cacheTTL

**Props:**
```typescript
{
  component: React.ComponentType | string,
  componentProps?: Record<string, any>,
  dataSource?: ApiDataSource,
  visibility?: VisibilityRule[],
  cacheTTL?: number,
  renderLoading?: () => ReactNode,
  renderError?: (error, retry) => ReactNode,
  renderEmpty?: () => ReactNode,
  children?: ReactNode
}
```

#### LayoutBuilder (`components/LayoutBuilder.tsx`)
Flexible layout system using `layoutType: 'flex-row' | 'flex-col'`:
- Equal width/height distribution for children without explicit sizes
- Recursive nested layout support
- Integrates with ComponentWrapper for data/visibility
- Flexbox-based implementation

**Config Structure:**
```typescript
{
  layoutType: 'flex-row' | 'flex-col',
  children: LayoutItem[],
  width?: string,
  height?: string,
  gap?: string,
  style?: CSSProperties
}
```

#### Chart, Table, Data Components
Pure presentation components:
- **Chart**: ECharts integration with auto-option generation
- **Table**: Mantine React Table with sorting, pagination, row hover
- **Data**: Stat/KPI/List layouts with formatting utilities

#### DashboardGrid (`components/DashboardGrid.tsx`)
Renamed from DashboardLayout:
- react-grid-layout integration
- Uses ComponentWrapper for widgets
- Drag, resize, localStorage persistence

### 3. Hybrid State Management

**react-router loaders** - Initial page data:
- `dashboardsLoader()` → GET /api/dashboards
- `dashboardDetailLoader({ params })` → GET /api/dashboards/:id
- `databaseLoader()` → GET /api/database/metrics

**react-query** - Widget-level data:
- Used by ComponentWrapper via `useWidgetData()`
- Handles polling, caching, refetching per widget

**Zustand** - Cross-widget state:
- `contextService.ts` for filters, selections, context bindings
- Used for widget visibility evaluation

### 4. Component Registry System

**Service:** `services/componentRegistry.ts`

Functions:
- `registerComponent(name, component)`
- `getComponent(name)`
- `registerBatch(components)`
- `hasComponent(name)`

All components registered at app boot in `App.tsx` for use in LayoutBuilder.

### 5. Database Monitoring Page

**Route:** `/database`

**Features:**
- MySQL metrics: Active Connections, QPS, Slow Queries, Replication Lag, Buffer Pool Hit %, InnoDB Pending I/O
- 2x3 grid of stat cards (equal width distribution)
- QPS history line chart
- Built using LayoutBuilder with flex-row/flex-col layout

**Mock API:** `GET /api/database/metrics` added to `mock-api-server.cjs`

### 6. Updated Navigation

**Routes:**
- `/` → Redirect to `/dashboards`
- `/dashboards` → List of all dashboards
- `/dashboards/:id` → Single dashboard view
- `/database` → MySQL metrics page

**NavBar:**
- Dashboards tab
- Database tab
- Active route highlighting

### 7. Type System Updates

**New Types:** (`types/config.ts`)
- `LayoutType = 'flex-row' | 'flex-col'`
- `LayoutBuilderConfig`
- `LayoutItem`
- `ComponentWrapperProps`

**Legacy Types:** Kept for backward compatibility
- `StaticLayoutConfig`
- `StaticLayoutItem`

### 8. Mantine Integration

- `MantineProvider` added to App.tsx
- `MantineReactTable` replaces raw HTML table
- Imports: `@mantine/core/styles.css`, `mantine-react-table/styles.css`

## Migration Guide

### Using ComponentWrapper

**Old (WidgetWrapper):**
```tsx
<WidgetWrapper config={widgetConfig} />
```

**New (ComponentWrapper):**
```tsx
<ComponentWrapper
  component={Chart}
  componentProps={{ chartType: 'line', title: 'My Chart' }}
  dataSource={{ url: '/api/metrics' }}
  cacheTTL={5000}
/>
```

### Using LayoutBuilder

**Example:**
```tsx
const config: LayoutBuilderConfig = {
  layoutType: 'flex-row',
  gap: '1rem',
  children: [
    {
      component: 'Data',
      componentProps: { data: {...}, layout: 'stat', fields: [...] },
      style: { background: 'white', padding: '1rem' }
    },
    {
      component: 'Chart',
      componentProps: { chartType: 'line', data: [...] },
    }
  ]
};

<LayoutBuilder config={config} />
```

### Creating New Pages

1. Create page component in `src/pages/FeatureName/`
2. Add loader function in `services/apiService.ts`
3. Add route in `routes/routes.tsx`
4. Register page component in `App.tsx`
5. Add navigation item to NavBar

## Running the Application

```bash
# Start mock API server
npm run mock-api

# Start dev server (separate terminal)
npm run dev

# Or run both together
npm run dev:full
```

**Available URLs:**
- http://localhost:5173/dashboards - Dashboard list
- http://localhost:5173/dashboards/infra-overview - Infrastructure dashboard
- http://localhost:5173/dashboards/app-metrics - Application metrics
- http://localhost:5173/database - MySQL database metrics

## Benefits

1. **Cleaner Architecture**: Feature-based pages, reusable components
2. **Universal Wrapper**: All components benefit from cache/API/loading/error handling
3. **Flexible Layouts**: LayoutBuilder enables config-driven UI without hardcoding
4. **Better Performance**: Hybrid state (router + react-query + Zustand) eliminates redundant fetches
5. **Type Safety**: Strong TypeScript types throughout
6. **Better UX**: Mantine components, active nav highlighting, responsive layouts
7. **Maintainability**: Clear folder structure, single responsibility components

## Next Steps

- [ ] Add unit tests for ComponentWrapper, LayoutBuilder
- [ ] Add error boundaries
- [ ] Implement real-time database metric polling
- [ ] Add more dashboard examples
- [ ] Create configuration documentation
- [ ] Add authentication/authorization
