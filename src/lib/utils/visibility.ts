import type { VisibilityRule } from '../types/config'
import { getNestedValue } from './shared'

function evaluateRule(rule: VisibilityRule, context: Record<string, unknown>): boolean {
  const contextValue = getNestedValue(context, rule.contextKey)

  switch (rule.op) {
    case 'eq':
      return contextValue === rule.value
    case 'ne':
      return contextValue !== rule.value
    case 'in':
      return Array.isArray(rule.value) && rule.value.includes(contextValue)
    case 'gt':
      return contextValue > rule.value
    case 'lt':
      return contextValue < rule.value
    case 'contains':
      return typeof contextValue === 'string' && typeof rule.value === 'string' && contextValue.includes(rule.value)
    case 'exists':
      return contextValue !== undefined && contextValue !== null
    default:
      return false
  }
}

export function evaluateVisibility(
  rules: VisibilityRule[] | undefined,
  context: Record<string, unknown>
): boolean {
  if (!rules || rules.length === 0) {
    return true
  }

  return rules.every(rule => evaluateRule(rule, context))
}
