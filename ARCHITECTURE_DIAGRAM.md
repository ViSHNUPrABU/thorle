# Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ BrowserRouter + QueryClientProvider                    │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │         StaticLayout                              │ │ │
│  │  │         (config from appConfig.navLayout)        │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## StaticLayout Rendering Flow

```
StaticLayout
    │
    ├─ Read config.direction ('row' or 'column')
    │
    └─ For each item in config.items:
        │
        ├─ type: 'widget' ──→ Render WidgetWrapper
        │                      └─ ChartWidget / TableWidget / DataWidget
        │
        ├─ type: 'layout' ──→ Render nested StaticLayout
        │                      └─ Recursive rendering
        │
        └─ type: 'component' ─→ Lookup in componentRegistry
                                └─ Render registered component
```

## Default App Layout Structure

```
┌────────────────────────────────────────────────────────┐
│  NavBar (StaticLayout: row, height: 60px)             │
│  ┌──────────┬──────────────────────────────────────┐  │
│  │ AppTitle │  (Could add widgets here)            │  │
│  └──────────┴──────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
│
├─────────────────────────────────────────────────────────┐
│  Main Content (StaticLayout: row, flex: 1)             │
│  ┌───────────────┬──────────────────────────────────┐  │
│  │ Sidebar       │  Content Area                    │  │
│  │ (200px)       │  (flex: 1)                       │  │
│  │               │                                  │  │
│  │ ┌──────────┐  │  ┌────────────────────────────┐ │  │
│  │ │Dashboards│  │  │ React Router               │ │  │
│  │ └──────────┘  │  │  /dashboards                │ │  │
│  │               │  │    → DashboardListPage      │ │  │
│  │               │  │  /dash/:id                  │ │  │
│  │               │  │    → DashboardPage          │ │  │
│  │               │  │      → DashboardLayout      │ │  │
│  │               │  │        → WidgetWrapper × N  │ │  │
│  │               │  └────────────────────────────┘ │  │
│  └───────────────┴──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Component Registry System

```
┌─────────────────────────────────────────────────────┐
│           Component Registry                        │
│  (Map<string, React.ComponentType>)                 │
├─────────────────────────────────────────────────────┤
│  'AppTitle'          → AppTitle component           │
│  'SidebarNavItem'    → SidebarNavItem component     │
│  'ContentArea'       → ContentArea component        │
│  'DashboardListPage' → DashboardListPage component  │
│  'DashboardLayout'   → DashboardLayout component    │
│  'DashboardPage'     → DashboardPage component      │
│  'MyCustomComponent' → (your component)             │
└─────────────────────────────────────────────────────┘
                    ↓
        Used by StaticLayout to render
        items with type: 'component'
```

## DashboardLayout (Grid System)

```
┌─────────────────────────────────────────────────────────┐
│  DashboardLayout                                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │ React Grid Layout (12 columns)                    │  │
│  │                                                    │  │
│  │  ┌─────────────┐  ┌─────────────┐                │  │
│  │  │ Widget 1    │  │ Widget 2    │  Draggable     │  │
│  │  │ (x:0, w:6)  │  │ (x:6, w:6)  │  Resizable     │  │
│  │  └─────────────┘  └─────────────┘                │  │
│  │                                                    │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │ Widget 3 (x:0, w:12)                       │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │                                                    │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
         │
         └─ Saves layout to localStorage
```

## Widget Rendering Pipeline

```
WidgetConfig
    │
    ├─ type: 'chart' ──→ ChartWidget
    │                     └─ ECharts with echartsOption
    │
    ├─ type: 'table' ──→ TableWidget
    │                     └─ Material-UI Table with columns
    │
    └─ type: 'data' ───→ DataWidget
                          └─ stat / list / kpi layout
                          
         │
         └─ dataSource ──→ API fetch
                           └─ Optional polling
                           └─ Optional caching
```

## Config Flow

```
┌──────────────────────────────────────────────────────┐
│  dashboards.ts (or API)                              │
│  ┌────────────────────────────────────────────────┐  │
│  │  export const appConfig: AppConfig = {         │  │
│  │    nav: [...],                                 │  │
│  │    navLayout: {...},                           │  │
│  │    dashboards: [...]                           │  │
│  │  }                                             │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────────┐
│  App.tsx                                             │
│  import { appConfig } from './configs/dashboards'    │
│  <StaticLayout config={appConfig.navLayout} />       │
└──────────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────────┐
│  StaticLayout.tsx                                    │
│  Recursively renders config                          │
└──────────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────────┐
│  Browser                                             │
│  Fully rendered UI                                   │
└──────────────────────────────────────────────────────┘
```

## Data Flow for Widgets

```
Widget Config
    │
    ├─ dataSource.url ──→ API Service
    │                      │
    │                      ├─ React Query (fetch)
    │                      │
    │                      └─ Polling timer (optional)
    │
    ├─ contextBindings ──→ Context Service
    │                       └─ Zustand store
    │
    └─ visibility ───────→ Visibility Evaluator
                            └─ Check context rules
                            
                ↓
         Widget Renderer
                ↓
         React Component
```

## File Organization

```
src/
├── components/
│   ├── Layout/
│   │   ├── StaticLayout.tsx      ← Row/column layouts
│   │   ├── DashboardLayout.tsx   ← Grid layouts
│   │   └── index.ts
│   ├── Dashboard/
│   │   ├── Dashboard.tsx         ← Legacy wrapper
│   │   └── DashboardListPage.tsx ← Dashboard gallery
│   ├── Widget/
│   │   ├── WidgetWrapper.tsx
│   │   ├── ChartWidget.tsx
│   │   ├── TableWidget.tsx
│   │   └── DataWidget.tsx
│   └── NavBar/
│       └── NavBarLayout.tsx      ← Example navbar
├── configs/
│   ├── dashboards.ts             ← Main config
│   └── advancedExample.ts        ← Example configs
├── types/
│   └── config.ts                 ← TypeScript types
├── utils/
│   ├── configLoader.ts           ← Load from API
│   ├── templating.ts
│   └── visibility.ts
└── App.tsx                       ← Entry point
```

## Type Hierarchy

```
AppConfig
  ├── nav: NavItemConfig[]
  │     ├── id: string
  │     ├── label: string
  │     ├── dashboardId?: string
  │     └── rightWidgets?: StaticLayoutConfig
  │
  ├── navLayout?: StaticLayoutConfig
  │     ├── direction: 'row' | 'column'
  │     └── items: StaticLayoutItem[]
  │           ├── type: 'widget' | 'layout' | 'component'
  │           ├── widgetConfig?: WidgetConfig
  │           ├── children?: StaticLayoutItem[]
  │           ├── component?: string
  │           └── props?: Record<string, any>
  │
  └── dashboards: DashboardLayoutConfig[]
        ├── id: string
        ├── title: string
        └── layout: WidgetConfig[]
              ├── id: string
              ├── type: 'chart' | 'table' | 'data'
              ├── position?: GridPosition
              └── dataSource?: ApiDataSource
```

## Summary

```
┌─────────────────────────────────────────────┐
│  100% Config-Driven Architecture            │
├─────────────────────────────────────────────┤
│  ✓ StaticLayout for fixed layouts           │
│  ✓ DashboardLayout for grid layouts         │
│  ✓ Component registry for custom components │
│  ✓ Widget system for data visualization     │
│  ✓ Type-safe TypeScript configs             │
│  ✓ API loading support                      │
│  ✓ Validation utilities                     │
│  ✓ Context-based visibility                 │
└─────────────────────────────────────────────┘
```
