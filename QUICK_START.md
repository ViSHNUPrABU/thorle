# Quick Start Guide: Config-Driven UI

## 🚀 Getting Started in 5 Minutes

### 1. Understanding the System

Your entire UI is now defined in **`src/configs/dashboards.ts`**. No code changes needed to modify layouts!

### 2. Basic Structure

```typescript
export const appConfig: AppConfig = {
  nav: [/* navigation items */],
  navLayout: {/* how the app is laid out */},
  dashboards: [/* dashboard definitions */]
}
```

### 3. Try It Out

**Change the sidebar to the right:**

In `src/configs/dashboards.ts`, find this section:
```typescript
// Left sidebar
{
  type: 'layout',
  width: '200px',  // ← Try changing this
  direction: 'column',
  // ...
}
```

Change it to be on the right by reordering the children array.

### 4. Add Widgets to Navbar

Add this to the navbar items array:
```typescript
{
  type: 'widget',
  width: '120px',
  widgetConfig: {
    id: 'navbar-stat',
    type: 'data',
    layout: 'stat',
    fields: [{ key: 'userId', label: 'CPU' }],
    dataSource: {
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      polling: { intervalMs: 5000 }
    }
  }
}
```

### 5. Change Layout Direction

Switch from vertical to horizontal:
```typescript
navLayout: {
  direction: 'row',  // ← Change from 'column' to 'row'
  // ...
}
```

### 6. Add a New Dashboard

In the `dashboards` array:
```typescript
{
  id: 'my-new-dashboard',
  title: 'My New Dashboard',
  layout: [
    {
      id: 'my-widget',
      type: 'chart',
      title: 'My Chart',
      position: { x: 0, y: 0, w: 6, h: 4 },
      chartType: 'line',
      echartsOption: {
        xAxis: { type: 'category', data: ['A', 'B', 'C'] },
        yAxis: { type: 'value' },
        series: [{ data: [10, 20, 30], type: 'line' }]
      }
    }
  ]
}
```

Then navigate to `/dash/my-new-dashboard` to see it!

### 7. Try Advanced Examples

Copy configs from `src/configs/advancedExample.ts` into `dashboards.ts`:

```typescript
// Replace navLayout with an example
import { navbarWithWidgets } from './advancedExample';

export const appConfig: AppConfig = {
  ...navbarWithWidgets,
  dashboards: [ /* your dashboards */ ]
};
```

### 8. Create Custom Components

```typescript
// 1. Create component
const MyWidget = () => <div>Hello!</div>;

// 2. Register it (in App.tsx)
registerComponent('MyWidget', MyWidget);

// 3. Use in config
{
  type: 'component',
  component: 'MyWidget'
}
```

## 📋 Cheat Sheet

### Layout Types

| Type | Use For | Example |
|------|---------|---------|
| `layout` | Container for other items | Navbar, sidebar, sections |
| `widget` | Data visualization | Charts, tables, KPIs |
| `component` | Custom React component | Logo, menu, custom UI |

### Common Patterns

**Fixed Navbar:**
```typescript
{
  type: 'layout',
  height: '60px',
  direction: 'row',
  children: [/* navbar items */]
}
```

**Sidebar:**
```typescript
{
  type: 'layout',
  width: '200px',
  direction: 'column',
  children: [/* sidebar items */]
}
```

**Flex Content:**
```typescript
{
  type: 'component',
  component: 'ContentArea',
  flex: 1  // Takes remaining space
}
```

**Equal Split:**
```typescript
{
  direction: 'row',
  children: [
    { type: 'component', component: 'A', flex: 1 },
    { type: 'component', component: 'B', flex: 1 }
  ]
}
```

**2/3 - 1/3 Split:**
```typescript
{
  direction: 'row',
  children: [
    { type: 'component', component: 'A', flex: 2 },
    { type: 'component', component: 'B', flex: 1 }
  ]
}
```

## 🎨 Styling

Add inline styles to any item:
```typescript
{
  type: 'layout',
  direction: 'row',
  style: {
    background: '#1e1e1e',
    color: 'white',
    padding: '1rem',
    gap: '1rem',
    borderRadius: '8px'
  }
}
```

## 🔍 Debugging

### Item not showing?
- Check `visibility` rules
- Check `width`/`height` - might be 0
- Check `flex` value
- Check parent layout direction

### Component not found?
```typescript
// Make sure it's registered
registerComponent('MyComponent', MyComponent);
```

### Widget not rendering?
- Check widget `type` is valid
- Check `dataSource.url` is accessible
- Check browser console for errors

## 📚 Next Steps

1. Read `CONFIG_DRIVEN_UI.md` for architecture details
2. Browse `CONFIG_EXAMPLES.md` for 10 practical examples
3. Check `IMPLEMENTATION_SUMMARY_CONFIG_UI.md` for technical details
4. Experiment with `src/configs/advancedExample.ts`

## 🆘 Common Questions

**Q: Can I nest layouts?**  
A: Yes! Infinite nesting is supported.

**Q: Can I mix static and grid layouts?**  
A: Yes! Use StaticLayout for app structure, DashboardLayout for dashboards.

**Q: Can I load config from API?**  
A: Yes! Use `loadAppConfigWithFallback` from `utils/configLoader.ts`

**Q: Can I use context/visibility rules?**  
A: Yes! Add `visibility` array to any item.

**Q: Can widgets poll for updates?**  
A: Yes! Add `polling: { intervalMs: 5000 }` to `dataSource`

## 🎯 Pro Tips

1. **Start simple** - Begin with basic layouts, add complexity gradually
2. **Use flexbox** - Understand flex: 1 vs flex: 2 vs width: '200px'
3. **Test responsive** - Check different screen sizes
4. **Component registry** - Register reusable components once, use everywhere
5. **Validation** - Use `validateAppConfig` before deploying configs

---

**Happy config-driven development! 🚀**
