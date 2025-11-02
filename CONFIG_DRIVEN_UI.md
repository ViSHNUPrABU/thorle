# Config-Driven UI Architecture

This application implements a **100% config-driven UI** using two layout systems:

## Layout Systems

### 1. **StaticLayout** - Fixed Row/Column Layouts
For navbar, sidebars, and fixed layouts where components are arranged in rows or columns.

#### Features:
- **Direction**: `row` or `column`
- **Nested layouts**: Infinite nesting support
- **Flex-based sizing**: Equal distribution or custom flex values
- **Fixed dimensions**: Support for `width` and `height`
- **Widget embedding**: Embed widgets anywhere in the layout
- **Component rendering**: Render registered React components
- **Visibility rules**: Conditional rendering based on context

#### Configuration Example:
```typescript
{
  direction: 'column',
  items: [
    {
      type: 'layout',
      height: '60px',
      direction: 'row',
      children: [
        { type: 'component', component: 'AppTitle' },
        { type: 'component', component: 'NavMenu', flex: 1 }
      ]
    },
    {
      type: 'layout',
      direction: 'row',
      flex: 1,
      children: [
        { 
          type: 'layout',
          width: '200px',
          direction: 'column',
          children: [
            { type: 'component', component: 'SidebarNavItem', props: { label: 'Dashboards' } }
          ]
        },
        { type: 'component', component: 'ContentArea', flex: 1 }
      ]
    }
  ]
}
```

### 2. **DashboardLayout** - Grid-Based Draggable Layouts
For dashboard pages with draggable, resizable widgets.

#### Features:
- **12-column grid system**
- **Drag & drop** widget positioning
- **Resize** widgets
- **Persistent layout** (saved to localStorage)
- **Reset** to default layout

#### Configuration Example:
```typescript
{
  id: 'infra-overview',
  title: 'Infrastructure Overview',
  layout: [
    {
      id: 'cpu-chart',
      type: 'chart',
      title: 'CPU Usage',
      position: { x: 0, y: 0, w: 6, h: 4 },
      chartType: 'line',
      dataSource: { url: '/api/cpu', polling: { intervalMs: 15000 } }
    }
  ]
}
```

## Type System

### StaticLayoutItem Types

1. **Widget Type** - Embed a widget configuration
```typescript
{
  type: 'widget',
  widgetConfig: {
    id: 'my-widget',
    type: 'chart',
    chartType: 'gauge',
    // ... widget config
  }
}
```

2. **Layout Type** - Nested layout
```typescript
{
  type: 'layout',
  direction: 'row',
  children: [ /* more items */ ]
}
```

3. **Component Type** - Render a registered component
```typescript
{
  type: 'component',
  component: 'DashboardListPage',
  props: { /* component props */ }
}
```

### Common Properties

- `flex`: Flex grow factor (default: 1)
- `width`: CSS width string (e.g., "200px", "20%")
- `height`: CSS height string (e.g., "60px", "100%")
- `style`: Additional CSS properties
- `visibility`: Array of visibility rules

## Component Registry

Register components to make them available in StaticLayout:

```typescript
import { registerComponent } from './components/Layout/StaticLayout';

registerComponent('MyComponent', MyComponent);
```

Pre-registered components:
- `AppTitle` - Application title
- `SidebarNavItem` - Sidebar navigation item
- `ContentArea` - Main content routing area
- `DashboardListPage` - Dashboard list view
- `DashboardLayout` - Grid dashboard layout
- `DashboardPage` - Dashboard wrapper with routing

## App Configuration

The entire app layout is defined in `configs/dashboards.ts`:

```typescript
export const appConfig: AppConfig = {
  nav: [
    { id: 'dashboards', label: 'Dashboards' }
  ],
  navLayout: {
    // StaticLayout config for entire app layout
  },
  dashboards: [
    // DashboardLayout configs
  ]
}
```

## How It Works

1. **App.tsx** renders `StaticLayout` with `appConfig.navLayout`
2. **StaticLayout** recursively renders layout items
3. **Component items** are looked up in the component registry
4. **Widget items** are rendered using `WidgetWrapper`
5. **Layout items** create nested `StaticLayout` instances
6. **ContentArea** component handles React Router routes
7. **DashboardPage** fetches dashboard config and renders `DashboardLayout`

## Benefits

✅ **100% Config-Driven**: Change entire UI structure without code changes  
✅ **Type-Safe**: Full TypeScript support  
✅ **Flexible**: Mix static layouts with grid layouts  
✅ **Reusable**: Components can be used in any layout  
✅ **Dynamic**: Fetch configs from API (future enhancement)  
✅ **Conditional**: Visibility rules based on context  

## Adding New Components

1. Create your component
2. Register it: `registerComponent('MyComponent', MyComponent)`
3. Use in config: `{ type: 'component', component: 'MyComponent' }`

## Adding New Widgets

Just add widget config to dashboard layout:

```typescript
{
  id: 'my-widget',
  type: 'chart',
  title: 'My Widget',
  position: { x: 0, y: 0, w: 6, h: 4 },
  // ... widget-specific config
}
```

## Future Enhancements

- [ ] Fetch configs from API
- [ ] Visual config editor
- [ ] Save custom layouts per user
- [ ] Import/export configurations
- [ ] Theme support in config
