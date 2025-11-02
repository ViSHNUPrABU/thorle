# Quick Reference: D3-Like Config Syntax

## Basic Structure

```typescript
{
  direction: 'row' | 'column',
  children: [ /* items */ ],
  width?: string | number,
  height?: string | number,
  style?: CSSProperties
}
```

## Item Types (Inferred Automatically)

| Properties | Inferred Type | Renders |
|------------|---------------|---------|
| `widgetConfig: {...}` | Widget | Chart/Table/Data widget |
| `direction: '...', children: [...]` | Layout | Nested layout |
| `component: 'Name'` | Component | Registered component |

## Size Options

```typescript
width: '10%'        // Percentage
width: '200px'      // Pixels
width: 200          // Number = pixels
width: '10rem'      // Any CSS unit
// Omit = auto (remaining space)
```

## Quick Examples

### Navbar
```typescript
{
  direction: 'row',
  height: '60px',
  children: [
    { component: 'Logo', width: '10%' },
    { component: 'Nav' }  // 90%
  ]
}
```

### Sidebar
```typescript
{
  direction: 'row',
  children: [
    { width: '20%', component: 'Sidebar' },
    { component: 'Content' }  // 80%
  ]
}
```

### Three Columns
```typescript
{
  direction: 'row',
  children: [
    { component: 'A' },  // 33.33%
    { component: 'B' },  // 33.33%
    { component: 'C' }   // 33.33%
  ]
}
```

### Widget
```typescript
{
  width: '120px',
  widgetConfig: {
    id: 'cpu',
    type: 'data',
    layout: 'stat'
  }
}
```

### Nested
```typescript
{
  direction: 'column',
  children: [
    { height: '60px', component: 'Header' },
    {
      direction: 'row',
      children: [
        { width: '200px', component: 'Sidebar' },
        { component: 'Main' }
      ]
    }
  ]
}
```

## Common Patterns

### Fixed + Flex
```typescript
children: [
  { width: '200px', component: 'Fixed' },
  { component: 'Flex' }
]
```

### Percentage Split
```typescript
children: [
  { width: '30%', component: 'A' },
  { width: '70%', component: 'B' }
]
```

### Equal Split
```typescript
children: [
  { component: 'A' },
  { component: 'B' }
]
```

### Mixed Units
```typescript
children: [
  { width: '10%', component: 'Logo' },
  { width: '120px', component: 'Widget' },
  { component: 'Remaining' }
]
```

## Remember

✅ No `type` field needed  
✅ No manual `flex` calculations  
✅ Use `children` not `items`  
✅ Omit size for auto-distribution  
✅ Mix percentages and pixels freely  

## Cheat Sheet

```typescript
// Minimal layout
{
  direction: 'row',
  children: [
    { component: 'A' },
    { component: 'B' }
  ]
}

// With sizing
{
  direction: 'row',
  children: [
    { width: '20%', component: 'A' },
    { component: 'B' }  // Gets 80%
  ]
}

// With widget
{
  direction: 'row',
  children: [
    { width: '200px', widgetConfig: {/*...*/} },
    { component: 'B' }
  ]
}

// Nested layouts
{
  direction: 'column',
  children: [
    {
      height: '60px',
      direction: 'row',
      children: [/*...*/]
    },
    { component: 'Main' }
  ]
}
```

---

**Print this and keep it handy!** 📄
