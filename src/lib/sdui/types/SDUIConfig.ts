export type SDUIActionType = 'navigate' | 'open-url' | 'dispatch-event' | 'custom';
export type SDUIActionTrigger = 'click' | 'hover' | 'submit' | 'change';
export type SDUIVisibilityOp = 'eq' | 'ne' | 'in' | 'gt' | 'lt' | 'contains' | 'exists';
export type SDUIDisplayType = 'block' | 'flex' | 'grid' | 'none';
export type SDUIFlexDirection = 'row' | 'column';
export type SDUIAlignType = 'start' | 'center' | 'end' | 'stretch';
export type SDUIJustifyType = 'start' | 'center' | 'end' | 'between' | 'around';
export type SDUISizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SDUICategory = 'layout' | 'data-display' | 'input' | 'navigation' | 'feedback';

export interface SDUIConfig {
  version: string;
  screen: string;
  metadata?: SDUIMetadata;
  components: SDUIComponent[];
}

export interface SDUIMetadata {
  theme?: string;
  trackingId?: string;
  lastUpdated?: string;
  author?: string;
}

export interface SDUIComponent {
  id: string;
  type: string;
  version?: string;
  props?: Record<string, any>;
  children?: SDUIComponent[];
  actions?: SDUIAction[];
  dataSource?: SDUIDataSource;
  visibility?: SDUIVisibilityRule[];
  style?: SDUIStyle;
  layout?: SDUILayout;
}

export interface SDUIAction {
  type: SDUIActionType;
  trigger: SDUIActionTrigger;
  payload: Record<string, any>;
}

export interface SDUIDataSource {
  id?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: any;
  polling?: { intervalMs: number; stopOnError?: boolean };
  cacheTTL?: number;
  transform?: string;
}

export interface SDUIVisibilityRule {
  contextKey: string;
  op: SDUIVisibilityOp;
  value: any;
}

export interface SDUIStyle {
  className?: string;
  variant?: string;
  size?: SDUISizeType;
  color?: string;
  custom?: Record<string, string>;
}

export interface SDUILayout {
  display?: SDUIDisplayType;
  flexDirection?: SDUIFlexDirection;
  gap?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  flex?: number;
  grow?: number;
  shrink?: number;
  basis?: string;
  align?: SDUIAlignType;
  justify?: SDUIJustifyType;
  wrap?: boolean;
  gridColumns?: number;
  gridRows?: number;
}
