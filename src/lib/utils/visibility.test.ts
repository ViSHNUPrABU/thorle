import { evaluateVisibility } from './visibility'
import type { VisibilityRule } from '../types/config'

describe('visibility', () => {
  const context = {
    role: 'admin',
    level: 5,
    status: 'active',
    tags: ['premium', 'verified'],
    user: {
      role: 'editor',
      level: 3,
    },
  }

  describe('empty rules', () => {
    it('returns true for undefined rules', () => {
      expect(evaluateVisibility(undefined, context)).toBe(true)
    })

    it('returns true for empty array', () => {
      expect(evaluateVisibility([], context)).toBe(true)
    })
  })

  describe('eq operator', () => {
    it('returns true when values match', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'role', op: 'eq', value: 'admin' }]
      expect(evaluateVisibility(rules, context)).toBe(true)
    })

    it('returns false when values do not match', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'role', op: 'eq', value: 'user' }]
      expect(evaluateVisibility(rules, context)).toBe(false)
    })
  })

  describe('ne operator', () => {
    it('returns true when values differ', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'role', op: 'ne', value: 'user' }]
      expect(evaluateVisibility(rules, context)).toBe(true)
    })

    it('returns false when values match', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'role', op: 'ne', value: 'admin' }]
      expect(evaluateVisibility(rules, context)).toBe(false)
    })
  })

  describe('in operator', () => {
    it('returns true when value is in array', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'status', op: 'in', value: ['active', 'pending'] }]
      expect(evaluateVisibility(rules, context)).toBe(true)
    })

    it('returns false when value is not in array', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'status', op: 'in', value: ['inactive', 'banned'] }]
      expect(evaluateVisibility(rules, context)).toBe(false)
    })

    it('returns false when value is not an array', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'status', op: 'in', value: 'active' }]
      expect(evaluateVisibility(rules, context)).toBe(false)
    })
  })

  describe('gt operator', () => {
    it('returns true when context value is greater', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'level', op: 'gt', value: 3 }]
      expect(evaluateVisibility(rules, context)).toBe(true)
    })

    it('returns false when context value is not greater', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'level', op: 'gt', value: 5 }]
      expect(evaluateVisibility(rules, context)).toBe(false)
    })

    it('returns false when context value is less', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'level', op: 'gt', value: 10 }]
      expect(evaluateVisibility(rules, context)).toBe(false)
    })
  })

  describe('lt operator', () => {
    it('returns true when context value is less', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'level', op: 'lt', value: 10 }]
      expect(evaluateVisibility(rules, context)).toBe(true)
    })

    it('returns false when context value is not less', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'level', op: 'lt', value: 5 }]
      expect(evaluateVisibility(rules, context)).toBe(false)
    })
  })

  describe('dot notation', () => {
    it('resolves nested values', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'user.role', op: 'eq', value: 'editor' }]
      expect(evaluateVisibility(rules, context)).toBe(true)
    })

    it('returns false for non-matching nested value', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'user.role', op: 'eq', value: 'admin' }]
      expect(evaluateVisibility(rules, context)).toBe(false)
    })

    it('handles deeply nested paths', () => {
      const deepContext = { a: { b: { c: { d: 'deep' } } } }
      const rules: VisibilityRule[] = [{ contextKey: 'a.b.c.d', op: 'eq', value: 'deep' }]
      expect(evaluateVisibility(rules, deepContext)).toBe(true)
    })
  })

  describe('AND logic', () => {
    it('returns true when all rules pass', () => {
      const rules: VisibilityRule[] = [
        { contextKey: 'role', op: 'eq', value: 'admin' },
        { contextKey: 'level', op: 'gt', value: 3 },
      ]
      expect(evaluateVisibility(rules, context)).toBe(true)
    })

    it('returns false when any rule fails', () => {
      const rules: VisibilityRule[] = [
        { contextKey: 'role', op: 'eq', value: 'admin' },
        { contextKey: 'level', op: 'gt', value: 10 },
      ]
      expect(evaluateVisibility(rules, context)).toBe(false)
    })
  })

  describe('missing context values', () => {
    it('returns false for missing key with eq', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'missing', op: 'eq', value: 'test' }]
      expect(evaluateVisibility(rules, context)).toBe(false)
    })

    it('returns true for missing key with ne', () => {
      const rules: VisibilityRule[] = [{ contextKey: 'missing', op: 'ne', value: 'test' }]
      expect(evaluateVisibility(rules, context)).toBe(true)
    })
  })
})
