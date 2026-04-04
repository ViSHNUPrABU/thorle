# Thorify

[![CI](https://github.com/your-org/thorify/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/thorify/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/thorify.svg)](https://www.npmjs.com/package/thorify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Server-driven UI component library for building dynamic dashboards and monitoring interfaces from JSON configurations.

## Why Thorify?

Thorify lets you build entire monitoring dashboards from backend JSON configs. Change your UI without redeploying frontend code. Define screens, widgets, layouts, data sources, visibility rules, and actions all in JSON -- Thorify renders them.

### Key Benefits

- **Zero redeploy UI changes** -- Update dashboards by changing JSON configs served from your API
- **Rich component system** -- Charts, tables, stats, KPIs, cards, grids, tabs, forms, navigation, feedback
- **Zod-validated SDUI** -- Every server-driven component is validated against Zod schemas before rendering
- **Conditional visibility** -- Show/hide components based on runtime context (user role, feature flags, etc.)
- **Template interpolation** -- Dynamic URLs and props with `{{key}}` syntax and nested object support
- **Data fetching built-in** -- Per-component data sources with polling, caching, and retry logic
- **Action system** -- Navigate, open URLs, dispatch custom events, or register custom handlers
- **Tree-shakeable** -- Import only what you need via subpath exports

## Installation

```bash
npm install thorify
```

### Peer Dependencies

Thorify requires these peer dependencies:

```bash
npm install react react-dom @mantine/core @mantine/hooks @tanstack/react-query axios zod zustand
```

Optional peer dependencies (only install what you use):

```bash
npm install echarts echarts-for-react mantine-react-table react-grid-layout react-router-dom
```

## Quick Start

### 1. Set up providers

```tsx
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>{children}</MantineProvider>
    </QueryClientProvider>
  )
}
```

### 2. Register components with the SDUI registry

```tsx
import { sduiRegistry, Stat, Card } from 'thorify'
import { z } from 'zod'

sduiRegistry.register('Stat', {
  component: Stat,
  schema: z.object({
    label: z.string(),
    value: z.union([z.string(), z.number()]),
    trend: z.enum(['up', 'down', 'neutral']).optional(),
  }),
  metadata: {
    version: '1.0.0',
    category: 'data-display',
    description: 'KPI stat card with trend',
  },
})

sduiRegistry.register('Card', {
  component: Card,
  schema: z.object({
    title: z.string().optional(),
    children: z.any().optional(),
  }),
  metadata: {
    version: '1.0.0',
    category: 'layout',
    description: 'Card container',
  },
})
```

### 3. Render from JSON config

```tsx
import { SDUIRenderer } from 'thorify'

const config = {
  version: '1.0.0',
  screen: 'overview',
  components: [
    {
      id: 'stat-1',
      type: 'Stat',
      props: { label: 'CPU Usage', value: 72, trend: 'up', trendValue: '+5%' },
    },
    {
      id: 'card-1',
      type: 'Card',
      props: { title: 'Server Metrics' },
      children: [
        {
          id: 'stat-2',
          type: 'Stat',
          props: { label: 'Memory', value: '4.2 GB' },
        },
      ],
    },
  ],
}

function DashboardPage() {
  return <SDUIRenderer config={config} />
}
```

### 4. Fetch config from API

```tsx
import { useState, useEffect } from 'react'
import { SDUIRenderer, validateSDUIConfig } from 'thorify'

function DynamicPage({ screenId }: { screenId: string }) {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    fetch(`/api/screens/${screenId}`)
      .then((res) => res.json())
      .then((data) => {
        const validation = validateSDUIConfig(data)
        if (validation.valid) {
          setConfig(data)
        } else {
          console.error('Invalid config:', validation.errors)
        }
      })
  }, [screenId])

  if (!config) return <div>Loading...</div>
  return <SDUIRenderer config={config} />
}
```

## Subpath Exports

```tsx
import { SDUIRenderer, sduiRegistry } from 'thorify/sdui'
import { Stat, Badge, Progress, Button, Card, Grid, Tabs } from 'thorify/components'
import { interpolateTemplate, evaluateVisibility } from 'thorify/utils'
import { useWidgetData, contextService } from 'thorify/services'
import type { SDUIConfig, WidgetConfig, ApiDataSource } from 'thorify/types'
```

## Component Catalog

### Layout

| Component | Description |
|-----------|-------------|
| `Stack` | Flexbox container (row/column) |
| `Container` | Responsive page container |
| `Card` | Card wrapper with title/subtitle |
| `Grid` | Responsive CSS grid with breakpoints |
| `Tabs` | Tabbed interface |

### Data Display

| Component | Description |
|-----------|-------------|
| `Stat` | KPI stat card with trend indicators |
| `Badge` | Status/label badges |
| `Progress` | Progress bar with percentage |
| `Chart` | ECharts-based charts (line, bar, area, gauge) |
| `Table` | Data table with sorting & pagination |
| `Data` | Multi-layout display (stat, list, kpi) |

### Input

| Component | Description |
|-----------|-------------|
| `Button` | Action button with variants |
| `Select` | Dropdown select with search |

### Navigation

| Component | Description |
|-----------|-------------|
| `Breadcrumb` | Breadcrumb navigation trail |

### Feedback

| Component | Description |
|-----------|-------------|
| `Toast` | Notification toast |

### Common

| Component | Description |
|-----------|-------------|
| `Loading` | Spinner loading indicator |
| `ErrorDisplay` | Error display with retry |
| `Empty` | Empty state placeholder |

## SDUI Config Schema

```typescript
interface SDUIConfig {
  version: string
  screen: string
  metadata?: { theme?: string; author?: string }
  components: SDUIComponent[]
}

interface SDUIComponent {
  id: string
  type: string
  props?: Record<string, any>
  children?: SDUIComponent[]
  actions?: SDUIAction[]
  dataSource?: { url: string; method?: string; polling?: { intervalMs: number } }
  visibility?: { contextKey: string; op: 'eq' | 'ne' | 'in' | 'gt' | 'lt'; value: any }[]
  style?: { className?: string; variant?: string }
}
```

## Visibility Rules

Components can be conditionally shown based on context:

```json
{
  "id": "admin-panel",
  "type": "Card",
  "visibility": [
    { "contextKey": "user.role", "op": "eq", "value": "admin" },
    { "contextKey": "features.dashboard", "op": "eq", "value": true }
  ]
}
```

## Development

```bash
npm install
npm run storybook     # Start Storybook
npm run test          # Run tests
npm run test:watch    # Watch mode
npm run lint          # Lint check
npm run typecheck     # TypeScript check
npm run build         # Production build
npm run check         # Run all checks
```

## License

MIT
