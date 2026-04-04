// src/services/validation.ts
import Ajv from 'ajv';
import type { DashboardConfig, WidgetConfig } from '../types/config';

const ajv = new Ajv();

// Widget Config Schema
const widgetSchema = {
  type: 'object',
  required: ['id', 'type'],
  properties: {
    id: { type: 'string' },
    type: { type: 'string', enum: ['chart', 'table', 'data'] },
    title: { type: 'string' },
    position: {
      type: 'object',
      properties: {
        x: { type: 'number' },
        y: { type: 'number' },
        w: { type: 'number' },
        h: { type: 'number' },
        minW: { type: 'number' },
        minH: { type: 'number' },
      },
    },
    visibility: {
      type: 'array',
      items: {
        type: 'object',
        required: ['contextKey', 'op', 'value'],
        properties: {
          contextKey: { type: 'string' },
          op: { type: 'string', enum: ['eq', 'ne', 'in', 'gt', 'lt'] },
          value: {},
        },
      },
    },
    dataSource: {
      type: 'object',
      required: ['url'],
      properties: {
        id: { type: 'string' },
        method: { type: 'string', enum: ['GET', 'POST'] },
        url: { type: 'string' },
        headers: { type: 'object' },
        params: { type: 'object' },
        body: {},
        polling: {
          type: 'object',
          required: ['intervalMs'],
          properties: {
            intervalMs: { type: 'number' },
            stopOnError: { type: 'boolean' },
          },
        },
        cacheTTL: { type: 'number' },
      },
    },
    contextBindings: {
      type: 'array',
      items: { type: 'string' },
    },
  },
};

// Dashboard Config Schema
const dashboardSchema = {
  type: 'object',
  required: ['id', 'title', 'layout'],
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    layout: {
      type: 'array',
      items: widgetSchema,
    },
    meta: { type: 'object' },
  },
};

const validateWidget = ajv.compile(widgetSchema);
const validateDashboard = ajv.compile(dashboardSchema);

/**
 * Validate a widget configuration
 */
export function validateWidgetConfig(config: WidgetConfig): { valid: boolean; errors?: string[] } {
  const valid = validateWidget(config);
  
  if (!valid && validateWidget.errors) {
    const errors = validateWidget.errors.map(err => 
      `${err.instancePath} ${err.message}`
    );
    return { valid: false, errors };
  }
  
  return { valid: true };
}

/**
 * Validate a dashboard configuration
 */
export function validateDashboardConfig(config: DashboardConfig): { valid: boolean; errors?: string[] } {
  const valid = validateDashboard(config);
  
  if (!valid && validateDashboard.errors) {
    const errors = validateDashboard.errors.map(err => 
      `${err.instancePath} ${err.message}`
    );
    return { valid: false, errors };
  }
  
  return { valid: true };
}

/**
 * Validate all dashboards in app config
 */
export function validateAppConfig(dashboards: DashboardConfig[]): {
  valid: boolean;
  errors: Record<string, string[]>;
} {
  const errors: Record<string, string[]> = {};
  let allValid = true;
  
  dashboards.forEach(dashboard => {
    const result = validateDashboardConfig(dashboard);
    if (!result.valid && result.errors) {
      errors[dashboard.id] = result.errors;
      allValid = false;
    }
  });
  
  return { valid: allValid, errors };
}
