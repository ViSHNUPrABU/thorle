// src/types/config.ts
export type WidgetType = "chart" | "table" | "data";

export type VisibilityOperator = "eq" | "ne" | "in" | "gt" | "lt";

export type VisibilityRule = {
  contextKey: string;
  op: VisibilityOperator;
  value: any;
};

export type ApiDataSource = {
  id?: string;
  method?: "GET" | "POST";
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: any;
  polling?: { intervalMs: number; stopOnError?: boolean };
  cacheTTL?: number;
};

export type BaseWidgetConfig = {
  id: string;
  type: WidgetType;
  title?: string;
  position?: { x: number; y: number; w: number; h: number; minW?: number; minH?: number };
  visibility?: VisibilityRule[];
  dataSource?: ApiDataSource;
  contextBindings?: string[];
};

export type ChartWidgetConfig = BaseWidgetConfig & {
  type: "chart";
  chartType: "line" | "bar" | "area" | "heatmap" | "gauge" | "custom";
  echartsOption?: any;
  seriesConfig?: any;
};

export type ColumnDef = { id: string; label: string; sortable?: boolean; render?: string };

export type TableWidgetConfig = BaseWidgetConfig & {
  type: "table";
  columns: ColumnDef[];
  pagination?: { mode: "client" | "server"; pageSize: number };
};

export type DataWidgetConfig = BaseWidgetConfig & {
  type: "data";
  layout: "stat" | "list" | "kpi";
  fields: { key: string; label?: string; format?: string }[];
};

export type WidgetConfig = ChartWidgetConfig | TableWidgetConfig | DataWidgetConfig;

// Static Layout types for non-grid layouts
export type LayoutDirection = "row" | "column";

export type StaticLayoutItem = {
  // Type can be inferred from presence of properties (D3-like structure)
  // No ID required - structure is implicit
  
  // Widget type - has widgetConfig
  widgetConfig?: WidgetConfig;
  
  // Layout type - has direction and children
  direction?: LayoutDirection;
  children?: StaticLayoutItem[];
  
  // Component type - has component name
  component?: string;
  props?: Record<string, any>;
  routes?: { path: string; component: string }[];
  
  // Size properties - more flexible
  // Can use: "200px", "20%", "10rem", or omit for flex
  width?: string | number;  // number = pixels, string = CSS value
  height?: string | number; // number = pixels, string = CSS value
  
  // Flex only used when width/height not specified
  // Omit flex to auto-calculate remaining space
  flex?: number;
  
  // Styling
  style?: React.CSSProperties;
  
  // Conditional rendering
  visibility?: VisibilityRule[];
};

export type StaticLayoutConfig = {
  direction: LayoutDirection;
  children: StaticLayoutItem[]; // Renamed from 'items' to 'children' for D3-like structure
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
};

// Dashboard Layout types
export type DashboardLayoutConfig = {
  id: string;
  title: string;
  layout: WidgetConfig[];
  meta?: Record<string, any>;
};

// Legacy type alias
export type DashboardConfig = DashboardLayoutConfig;

// Navigation item with optional widget rendering on right side
export type NavItemConfig = {
  id: string;
  label: string;
  route?: string;
  icon?: string;
  // If specified, clicking this nav item shows these widgets on the right
  rightWidgets?: StaticLayoutConfig;
  // Or render a specific dashboard
  dashboardId?: string;
};

export type NavItem = NavItemConfig;

export type AppConfig = {
  nav: NavItemConfig[];
  navLayout?: StaticLayoutConfig; // Optional: Full navbar layout config
  dashboards: DashboardLayoutConfig[];
  // API endpoint to fetch dashboards from (optional)
  dashboardsApiUrl?: string;
};

// API Response type for dashboard config fetch
export type DashboardApiResponse = {
  id: string;
  title: string;
  layout: WidgetConfig[];
  meta?: Record<string, any>;
};
