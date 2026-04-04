// src/utils/visibility.ts
import type { VisibilityRule } from '../types/config';

/**
 * Evaluate a single visibility rule against context
 */
function evaluateRule(rule: VisibilityRule, context: Record<string, any>): boolean {
  const contextValue = getNestedValue(context, rule.contextKey);
  
  switch (rule.op) {
    case 'eq':
      return contextValue === rule.value;
    case 'ne':
      return contextValue !== rule.value;
    case 'in':
      return Array.isArray(rule.value) && rule.value.includes(contextValue);
    case 'gt':
      return contextValue > rule.value;
    case 'lt':
      return contextValue < rule.value;
    default:
      return false;
  }
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Evaluate all visibility rules (AND logic)
 * Returns true if all rules pass or if no rules exist
 */
export function evaluateVisibility(
  rules: VisibilityRule[] | undefined,
  context: Record<string, any>
): boolean {
  if (!rules || rules.length === 0) {
    return true;
  }
  
  return rules.every(rule => evaluateRule(rule, context));
}
