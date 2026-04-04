// src/utils/templating.ts

/**
 * Interpolate template strings like "{{key}}" with context values
 * Example: interpolateTemplate("/api/host/{{selected.host}}", { "selected.host": "server-1" })
 * Returns: "/api/host/server-1"
 */
export function interpolateTemplate(template: string, context: Record<string, any>): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const trimmedKey = key.trim();
    const value = getNestedValue(context, trimmedKey);
    return value !== undefined ? String(value) : match;
  });
}

/**
 * Get nested value from object using dot notation
 * Example: getNestedValue({ selected: { host: "server-1" } }, "selected.host")
 * Returns: "server-1"
 */
function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Interpolate all string values in an object recursively
 */
export function interpolateObject(obj: any, context: Record<string, any>): any {
  if (typeof obj === 'string') {
    return interpolateTemplate(obj, context);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => interpolateObject(item, context));
  }
  
  if (obj && typeof obj === 'object') {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = interpolateObject(value, context);
    }
    return result;
  }
  
  return obj;
}
