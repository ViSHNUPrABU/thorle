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

export type DashboardConfig = {
  id: string;
  title: string;
  layout: WidgetConfig[];
  meta?: Record<string, any>;
};

export type NavItem = { id: string; label: string; route: string; icon?: string };

export type AppConfig = {
  nav: NavItem[];
  dashboards: DashboardConfig[];
};
