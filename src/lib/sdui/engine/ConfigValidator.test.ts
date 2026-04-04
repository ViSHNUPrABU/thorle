import { validateSDUIConfig } from './ConfigValidator'

describe('ConfigValidator', () => {
  describe('validateSDUIConfig', () => {
    it('returns valid for a minimal config', () => {
      const config = {
        version: '1.0.0',
        screen: 'dashboard',
        components: [],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(true)
      expect(result.errors).toBeUndefined()
    })

    it('returns valid for a full config', () => {
      const config = {
        version: '1.0.0',
        screen: 'dashboard',
        metadata: {
          theme: 'dark',
          author: 'test',
        },
        components: [
          {
            id: 'comp-1',
            type: 'Card',
            props: { title: 'Hello' },
          },
        ],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(true)
    })

    it('returns invalid when version is missing', () => {
      const config = {
        screen: 'dashboard',
        components: [],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(false)
      expect(result.errors).toBeDefined()
    })

    it('returns invalid when screen is missing', () => {
      const config = {
        version: '1.0.0',
        components: [],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(false)
    })

    it('returns invalid when components is missing', () => {
      const config = {
        version: '1.0.0',
        screen: 'dashboard',
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(false)
    })

    it('returns invalid when component is missing id', () => {
      const config = {
        version: '1.0.0',
        screen: 'dashboard',
        components: [
          { type: 'Card' },
        ],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(false)
    })

    it('returns invalid when component is missing type', () => {
      const config = {
        version: '1.0.0',
        screen: 'dashboard',
        components: [
          { id: 'comp-1' },
        ],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(false)
    })

    it('validates nested components', () => {
      const config = {
        version: '1.0.0',
        screen: 'dashboard',
        components: [
          {
            id: 'parent',
            type: 'Card',
            children: [
              { id: 'child', type: 'Button' },
            ],
          },
        ],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(true)
    })

    it('validates actions', () => {
      const config = {
        version: '1.0.0',
        screen: 'dashboard',
        components: [
          {
            id: 'btn',
            type: 'Button',
            actions: [
              { type: 'navigate', trigger: 'click', payload: { path: '/home' } },
            ],
          },
        ],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(true)
    })

    it('validates dataSource', () => {
      const config = {
        version: '1.0.0',
        screen: 'dashboard',
        components: [
          {
            id: 'data',
            type: 'Stat',
            dataSource: {
              url: '/api/data',
              method: 'GET',
            },
          },
        ],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(true)
    })

    it('validates visibility rules', () => {
      const config = {
        version: '1.0.0',
        screen: 'dashboard',
        components: [
          {
            id: 'comp',
            type: 'Card',
            visibility: [
              { contextKey: 'user.role', op: 'eq', value: 'admin' },
            ],
          },
        ],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(true)
    })

    it('returns invalid for unknown action type', () => {
      const config = {
        version: '1.0.0',
        screen: 'dashboard',
        components: [
          {
            id: 'btn',
            type: 'Button',
            actions: [
              { type: 'invalid-action', trigger: 'click', payload: {} },
            ],
          },
        ],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(false)
    })

    it('returns invalid for invalid dataSource', () => {
      const config = {
        version: '1.0.0',
        screen: 'dashboard',
        components: [
          {
            id: 'data',
            type: 'Stat',
            dataSource: {
              method: 'GET',
            },
          },
        ],
      }
      const result = validateSDUIConfig(config)
      expect(result.valid).toBe(false)
    })

    it('returns invalid for null config', () => {
      const result = validateSDUIConfig(null)
      expect(result.valid).toBe(false)
    })

    it('returns invalid for empty object', () => {
      const result = validateSDUIConfig({})
      expect(result.valid).toBe(false)
    })
  })
})
