# Monithor - Config-Driven Dashboard System

## 📚 Documentation Index

Welcome to Monithor's config-driven UI system! Here's where to start:

### 🚀 **Start Here**
1. **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
   - Try basic config changes
   - Add your first widget
   - Create a new dashboard

### 📖 **Core Documentation**
2. **[CONFIG_DRIVEN_UI.md](./CONFIG_DRIVEN_UI.md)** - Architecture overview
   - Layout systems (StaticLayout vs DashboardLayout)
   - Type system
   - Component registry
   - Benefits and features

3. **[ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)** - Visual diagrams
   - System overview
   - Component flow
   - Data flow
   - File organization

### 💡 **Examples & Patterns**
4. **[CONFIG_EXAMPLES.md](./CONFIG_EXAMPLES.md)** - 10 practical examples
   - Navbar with widgets
   - Dashboard selector
   - Nested layouts
   - Conditional rendering
   - API integration

5. **[src/configs/advancedExample.ts](./src/configs/advancedExample.ts)** - Working code examples
   - Navbar with live stats
   - Three-column layouts
   - Mixed layouts
   - Minimalist designs
   - Status bars

### 🔧 **Technical Details**
6. **[IMPLEMENTATION_SUMMARY_CONFIG_UI.md](./IMPLEMENTATION_SUMMARY_CONFIG_UI.md)** - Implementation details
   - Files created/modified
   - Key features
   - Migration guide
   - Future enhancements

## 🎯 Quick Reference

### Main Config File
```typescript
// src/configs/dashboards.ts
export const appConfig: AppConfig = {
  nav: [/* nav items */],
  navLayout: {/* app layout */},
  dashboards: [/* dashboards */]
}
```

### Key Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `StaticLayout` | Row/column layouts | `src/components/Layout/StaticLayout.tsx` |
| `DashboardLayout` | Grid dashboards | `src/components/Layout/DashboardLayout.tsx` |
| `WidgetWrapper` | Widget renderer | `src/components/Widget/WidgetWrapper.tsx` |
| `DashboardListPage` | Dashboard gallery | `src/components/Dashboard/DashboardListPage.tsx` |

### Key Utilities

| Utility | Purpose | Location |
|---------|---------|----------|
| `configLoader` | Load configs from API | `src/utils/configLoader.ts` |
| `registerComponent` | Register custom components | `src/components/Layout/StaticLayout.tsx` |
| `validateAppConfig` | Validate configurations | `src/utils/configLoader.ts` |

## 🎨 What You Can Do

### Without Code Changes
✅ Change entire app layout  
✅ Add/remove navigation items  
✅ Embed widgets anywhere  
✅ Modify dashboard layouts  
✅ Add new dashboards  
✅ Change colors and styles  
✅ Configure data sources  
✅ Set up polling intervals  

### With Minimal Code
✅ Create custom components  
✅ Add new widget types  
✅ Extend visibility rules  
✅ Custom data transformations  

## 🏗️ Architecture

```
Config (JSON/TypeScript)
    ↓
StaticLayout / DashboardLayout
    ↓
Component Registry + Widget System
    ↓
React Components
    ↓
Rendered UI
```

## 📦 What's Included

### New Files (9 files)
- `src/components/Layout/StaticLayout.tsx`
- `src/components/Layout/DashboardLayout.tsx`
- `src/components/Layout/index.ts`
- `src/components/Dashboard/DashboardListPage.tsx`
- `src/components/NavBar/NavBarLayout.tsx`
- `src/utils/configLoader.ts`
- `src/configs/advancedExample.ts`
- Plus 5 documentation files

### Modified Files (4 files)
- `src/types/config.ts` - Extended with StaticLayout types
- `src/configs/dashboards.ts` - Added navLayout config
- `src/App.tsx` - Now uses StaticLayout
- `src/components/Dashboard/Dashboard.tsx` - Simplified wrapper

## 🎓 Learning Path

1. **Beginner**: Read QUICK_START.md, try basic changes
2. **Intermediate**: Read CONFIG_DRIVEN_UI.md, explore examples
3. **Advanced**: Read IMPLEMENTATION_SUMMARY, create custom components
4. **Expert**: Extend system with new layout types

## 💬 Common Use Cases

### Simple Change
"I want to add a widget to the navbar"
→ See QUICK_START.md § 4

### Medium Complexity
"I want a three-column layout"
→ See CONFIG_EXAMPLES.md § 2 or advancedExample.ts

### Advanced
"I want to load configs from my API"
→ See configLoader.ts and CONFIG_EXAMPLES.md § 8

### Expert Level
"I want to create a new layout type"
→ Study StaticLayout.tsx and extend the type system

## 🔗 Key Concepts

### StaticLayout
- Fixed row/column layouts
- Perfect for app structure
- Supports nesting
- Widget embedding

### DashboardLayout
- Grid-based layouts
- Drag & drop
- Resizable widgets
- Persistent state

### Component Registry
- Register React components
- Use them in configs
- Reusable across layouts

### Config-Driven
- UI defined in JSON/TypeScript
- No code changes needed
- Type-safe
- API-loadable

## 🎯 Next Steps

1. **Try it**: Make a simple change in `src/configs/dashboards.ts`
2. **Explore**: Copy an example from `advancedExample.ts`
3. **Create**: Register a custom component
4. **Extend**: Load config from your API

---

**Happy config-driven development!** 🎉

For questions or issues, check the documentation files above or explore the source code.
