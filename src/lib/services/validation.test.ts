import { validateWidgetConfig, validateDashboardConfig, validateAppConfig } from './validation'

describe('validation', () => {
  describe('validateWidgetConfig', () => {
    it('returns valid for a minimal widget config', () => {
      const config = { id: 'w1', type: 'chart' }
      const result = validateWidgetConfig(config as any)
      expect(result.valid).toBe(true)
    })

    it('returns invalid when id is missing', () => {
      const config = { type: 'chart' }
      const result = validateWidgetConfig(config as any)
      expect(result.valid).toBe(false)
      expect(result.errors).toBeDefined()
      expect(result.errors?.length).toBeGreaterThan(0)
    })

    it('returns invalid when type is missing', () => {
      const config = { id: 'w1' }
      const result = validateWidgetConfig(config as any)
      expect(result.valid).toBe(false)
    })

    it('returns invalid for unknown widget type', () => {
      const config = { id: 'w1', type: 'unknown' }
      const result = validateWidgetConfig(config as any)
      expect(result.valid).toBe(false)
    })

    it('returns valid for chart widget', () => {
      const config = { id: 'w1', type: 'chart', chartType: 'line' }
      const result = validateWidgetConfig(config as any)
      expect(result.valid).toBe(true)
    })

    it('returns valid for table widget', () => {
      const config = { id: 'w1', type: 'table', columns: [] }
      const result = validateWidgetConfig(config as any)
      expect(result.valid).toBe(true)
    })

    it('returns valid for data widget', () => {
      const config = { id: 'w1', type: 'data', layout: 'stat', fields: [] }
      const result = validateWidgetConfig(config as any)
      expect(result.valid).toBe(true)
    })

    it('returns valid with optional fields', () => {
      const config = {
        id: 'w1',
        type: 'chart',
        title: 'My Chart',
        position: { x: 0, y: 0, w: 4, h: 3 },
      }
      const result = validateWidgetConfig(config as any)
      expect(result.valid).toBe(true)
    })

    it('returns valid with visibility rules', () => {
      const config = {
        id: 'w1',
        type: 'chart',
        visibility: [{ contextKey: 'role', op: 'eq', value: 'admin' }],
      }
      const result = validateWidgetConfig(config as any)
      expect(result.valid).toBe(true)
    })

    it('returns valid with dataSource', () => {
      const config = {
        id: 'w1',
        type: 'chart',
        dataSource: { url: '/api/data' },
      }
      const result = validateWidgetConfig(config as any)
      expect(result.valid).toBe(true)
    })
  })

  describe('validateDashboardConfig', () => {
    it('returns valid for a minimal dashboard', () => {
      const config = { id: 'd1', title: 'Dashboard', layout: [] }
      const result = validateDashboardConfig(config as any)
      expect(result.valid).toBe(true)
    })

    it('returns invalid when id is missing', () => {
      const config = { title: 'Dashboard', layout: [] }
      const result = validateDashboardConfig(config as any)
      expect(result.valid).toBe(false)
    })

    it('returns invalid when title is missing', () => {
      const config = { id: 'd1', layout: [] }
      const result = validateDashboardConfig(config as any)
      expect(result.valid).toBe(false)
    })

    it('returns invalid when layout is missing', () => {
      const config = { id: 'd1', title: 'Dashboard' }
      const result = validateDashboardConfig(config as any)
      expect(result.valid).toBe(false)
    })

    it('returns valid with widgets in layout', () => {
      const config = {
        id: 'd1',
        title: 'Dashboard',
        layout: [{ id: 'w1', type: 'chart' }],
      }
      const result = validateDashboardConfig(config as any)
      expect(result.valid).toBe(true)
    })

    it('returns valid with meta', () => {
      const config = { id: 'd1', title: 'Dashboard', layout: [], meta: { key: 'value' } }
      const result = validateDashboardConfig(config as any)
      expect(result.valid).toBe(true)
    })
  })

  describe('validateAppConfig', () => {
    it('returns valid for empty dashboards array', () => {
      const result = validateAppConfig([])
      expect(result.valid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('returns valid for valid dashboards', () => {
      const dashboards = [{ id: 'd1', title: 'Dashboard', layout: [] }]
      const result = validateAppConfig(dashboards as any)
      expect(result.valid).toBe(true)
    })

    it('returns invalid for invalid dashboard', () => {
      const dashboards = [{ id: 'd1', layout: [] }]
      const result = validateAppConfig(dashboards as any)
      expect(result.valid).toBe(false)
      expect(result.errors['d1']).toBeDefined()
    })

    it('returns errors keyed by dashboard id', () => {
      const dashboards = [
        { id: 'good', title: 'Good', layout: [] },
        { id: 'bad', layout: [] },
      ]
      const result = validateAppConfig(dashboards as any)
      expect(result.valid).toBe(false)
      expect(result.errors['bad']).toBeDefined()
      expect(result.errors['good']).toBeUndefined()
    })
  })
})
