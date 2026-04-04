import { getNestedValue } from './shared'

export function interpolateTemplate(template: string, context: Record<string, unknown>): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const trimmedKey = key.trim()
    const value = getNestedValue(context, trimmedKey)
    return value !== undefined ? String(value) : match
  })
}

export function interpolateObject(obj: unknown, context: Record<string, unknown>): unknown {
  if (typeof obj === 'string') {
    return interpolateTemplate(obj, context)
  }

  if (Array.isArray(obj)) {
    return obj.map(item => interpolateObject(item, context))
  }

  if (obj && typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = interpolateObject(value, context)
    }
    return result
  }

  return obj
}
