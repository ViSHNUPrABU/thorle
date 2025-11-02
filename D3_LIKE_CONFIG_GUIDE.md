# D3-Like Config Structure Guide

## Overview

The config structure has been redesigned to be **more intuitive and D3-like**, with:
- **No explicit `type` field** - type is inferred from properties
- **No `id` required** - structure is self-documenting
- **`children` instead of `items`** - consistent with D3 and React
- **Smart width/height allocation** - percentages, pixels, or auto
- **Cleaner nesting** - like a D3 tree structure

## Key Improvements

### Before (Old Style)
```typescript
{
  type: 'layout',  // ❌ Explicit type
  flex: 1,         // ❌ Manual flex calculation
  items: [         // ❌ Called 'items'
    {
      type: 'component',  // ❌ Verbose
      component: 'MyComponent',
      flex: 1
    }
  ]
}
```

### After (D3-Like)
```typescript
{
  direction: 'row',  // ✅ Type inferred from direction + children
  children: [        // ✅ Consistent with D3/React
    {
      component: 'MyComponent'  // ✅ Type inferred, size auto-calculated
    }
  ]
}
```

## Type Inference Rules

The system automatically infers the item type:

| Has Property | Type | Renders |
|--------------|------|---------|
| `widgetConfig` | Widget | WidgetWrapper with widget |
| `direction` + `children` | Layout | Nested StaticLayout |
| `component` | Component | Registered React component |

**No need to specify `type` explicitly!**

## Width/Height Calculation

### Fixed Sizes
```typescript
{
  width: 200,        // 200px
  width: '200px',    // 200px
  width: '20%',      // 20% of parent
  width: '10rem',    // 10rem (any CSS unit)
}
```

### Auto (Flex) Sizing
```typescript
{
  // No width = takes remaining space after fixed/percentage items
  // Multiple items without width share remaining space equally
}
```

### Example: Title 10%, Rest Auto
```typescript
{
  direction: 'row',
  children: [
    {
      component: 'Title',
      width: '10%'      // Title takes 10%
    },
    {
      component: 'NavBar' // NavBar takes remaining 90% automatically
    }
  ]
}
```

### Example: Three Equal Columns
```typescript
{
  direction: 'row',
  children: [
    { component: 'A' },  // Each takes 33.33%
    { component: 'B' },  // automatically
    { component: 'C' }
  ]
}
```

### Example: Mixed Sizing
```typescript
{
  direction: 'row',
  children: [
    { component: 'Sidebar', width: '200px' },  // Fixed 200px
    { component: 'Content' },                   // Takes calc(100% - 200px)
  ]
}
```

### Example: Percentage-Based
```typescript
{
  direction: 'row',
  children: [
    { component: 'Left', width: '25%' },    // 25%
    { component: 'Middle', width: '50%' },  // 50%
    { component: 'Right' }                   // Remaining 25% auto
  ]
}
```

## Real-World Examples

### Example 1: Simple Navbar
```typescript
{
  direction: 'row',
  height: '60px',
  style: { background: '#1e1e1e', padding: '0 1.5rem' },
  children: [
    {
      component: 'Logo',
      width: '200px'  // Fixed width logo
    },
    {
      component: 'NavMenu'  // Takes remaining space
    }
  ]
}
```

### Example 2: Sidebar Layout
```typescript
{
  direction: 'row',
  children: [
    {
      width: '15%',  // Left sidebar
      direction: 'column',
      style: { background: '#f5f5f5' },
      children: [
        { component: 'NavItem', props: { label: 'Home' } },
        { component: 'NavItem', props: { label: 'Settings' } }
      ]
    },
    {
      // Main content takes remaining 85%
      component: 'Content'
    }
  ]
}
```

### Example 3: Three Columns with Widgets
```typescript
{
  direction: 'row',
  children: [
    {
      width: '200px',  // Fixed left
      direction: 'column',
      children: [/* sidebar items */]
    },
    {
      // Middle takes remaining space
      component: 'Dashboard'
    },
    {
      width: '300px',  // Fixed right
      direction: 'column',
      children: [
        {
          height: '200px',
          widgetConfig: {
            id: 'chart-1',
            type: 'chart',
            chartType: 'gauge'
          }
        },
        {
          // This widget takes remaining height
          widgetConfig: {
            id: 'table-1',
            type: 'table',
            columns: [/*...*/]
          }
        }
      ]
    }
  ]
}
```

### Example 4: Top Bar with Live Stats
```typescript
{
  direction: 'row',
  height: '60px',
  style: { background: '#1e1e1e', gap: '1rem', padding: '0 1.5rem' },
  children: [
    {
      component: 'Logo',
      width: '10%'
    },
    {
      width: '120px',  // Fixed widget
      widgetConfig: {
        id: 'cpu',
        type: 'data',
        layout: 'stat',
        fields: [{ key: 'value', label: 'CPU' }]
      }
    },
    {
      width: '120px',  // Fixed widget
      widgetConfig: {
        id: 'memory',
        type: 'data',
        layout: 'stat',
        fields: [{ key: 'value', label: 'Memory' }]
      }
    },
    // Remaining space is empty/flexible
  ]
}
```

## Comparison with D3

### D3 Hierarchy
```javascript
const data = {
  name: "root",
  children: [
    { name: "child1" },
    {
      name: "child2",
      children: [
        { name: "grandchild1" }
      ]
    }
  ]
};
```

### Our Config
```typescript
const layout = {
  component: 'Root',
  children: [
    { component: 'Child1' },
    {
      component: 'Child2',
      children: [
        { component: 'Grandchild1' }
      ]
    }
  ]
};
```

**Notice the similarity!** Both use:
- Nested `children` arrays
- Implicit typing based on structure
- Tree-like hierarchy

## Benefits

### 1. Less Verbose
```typescript
// Before: 9 lines, 3 type declarations
{
  type: 'layout',
  direction: 'row',
  items: [
    { type: 'component', component: 'A', flex: 1 },
    { type: 'component', component: 'B', flex: 1 }
  ]
}

// After: 5 lines, 0 type declarations
{
  direction: 'row',
  children: [
    { component: 'A' },
    { component: 'B' }
  ]
}
```

### 2. More Intuitive
- No need to specify `type` - it's obvious
- No need to calculate `flex` - it's automatic
- `children` is familiar from React and D3

### 3. Easier to Read
```typescript
// Clear hierarchy, like a visual tree
{
  direction: 'column',
  children: [
    { height: '60px', direction: 'row', children: [/*navbar*/] },
    { direction: 'row', children: [/*content*/] },
    { height: '40px', direction: 'row', children: [/*footer*/] }
  ]
}
```

### 4. Smart Sizing
```typescript
// System automatically calculates remaining space
{
  direction: 'row',
  children: [
    { width: '10%', component: 'Logo' },      // 10%
    { width: '120px', component: 'Widget' },  // 120px
    { component: 'Content' }                   // Remaining: calc(90% - 120px)
  ]
}
```

## Migration Guide

### Update Your Configs

1. **Rename `items` to `children`**
   ```typescript
   // Before
   items: [...]
   
   // After
   children: [...]
   ```

2. **Remove `type` fields**
   ```typescript
   // Before
   { type: 'component', component: 'MyComp' }
   
   // After
   { component: 'MyComp' }
   ```

3. **Remove unnecessary `flex` fields**
   ```typescript
   // Before
   { component: 'A', flex: 1 }
   { component: 'B', flex: 1 }
   
   // After
   { component: 'A' }
   { component: 'B' }
   // They'll automatically share space equally
   ```

4. **Use percentages for better control**
   ```typescript
   // Before
   { component: 'Sidebar', width: '200px' }
   { component: 'Content', flex: 1 }
   
   // After (more responsive)
   { component: 'Sidebar', width: '20%' }
   { component: 'Content' }  // Auto: 80%
   ```

## Best Practices

### ✅ DO
- Omit size for equal distribution
- Use percentages for responsive layouts
- Use fixed px for components that shouldn't scale
- Nest naturally like a tree structure
- Let the system calculate remaining space

### ❌ DON'T
- Don't specify `type` manually
- Don't calculate flex values yourself
- Don't use `items` - use `children`
- Don't over-specify sizes - let them auto-calculate

## Advanced Patterns

### Pattern 1: Responsive Sidebar
```typescript
{
  direction: 'row',
  children: [
    {
      width: '15%',  // Sidebar scales with screen
      direction: 'column',
      children: [/*...*/]
    },
    { component: 'Content' }  // Takes remaining 85%
  ]
}
```

### Pattern 2: Fixed Header/Footer, Flex Content
```typescript
{
  direction: 'column',
  children: [
    { height: '60px', component: 'Header' },
    { component: 'Content' },  // Takes remaining height
    { height: '40px', component: 'Footer' }
  ]
}
```

### Pattern 3: Dashboard with Equal KPIs
```typescript
{
  direction: 'row',
  height: '120px',
  children: [
    { widgetConfig: {/* KPI 1 */} },
    { widgetConfig: {/* KPI 2 */} },
    { widgetConfig: {/* KPI 3 */} }
  ]
  // Each KPI automatically gets 33.33% width
}
```

### Pattern 4: Mixed Fixed and Flex
```typescript
{
  direction: 'row',
  children: [
    { width: '200px', component: 'FixedSidebar' },
    { width: '30%', component: 'FlexContent' },
    { width: '250px', component: 'FixedPanel' },
    { component: 'RemainingSpace' }  // Auto: calc(70% - 450px)
  ]
}
```

---

**The new structure is cleaner, more intuitive, and follows familiar patterns from D3 and React!**
