import { mergeAppConfigs, validateAppConfig } from './configLoader'
import type { AppConfig } from '../types/config'

describe('configLoader', () => {
  describe('mergeAppConfigs', () => {
    it('returns default config with no inputs', () => {
      const result = mergeAppConfigs()
      expect(result).toEqual({ nav: [], dashboards: [] })
    })

    it('merges nav arrays', () => {
      const config1: Partial<AppConfig> = { nav: [{ id: 'a', label: 'A' }] }
      const config2: Partial<AppConfig> = { nav: [{ id: 'b', label: 'B' }] }
      const result = mergeAppConfigs(config1, config2)
      expect(result.nav).toHaveLength(2)
      expect(result.nav[0].id).toBe('a')
      expect(result.nav[1].id).toBe('b')
    })

    it('merges dashboards arrays', () => {
      const config1: Partial<AppConfig> = { dashboards: [{ id: 'd1', title: 'D1', layout: [] }] }
      const config2: Partial<AppConfig> = { dashboards: [{ id: 'd2', title: 'D2', layout: [] }] }
      const result = mergeAppConfigs(config1, config2)
      expect(result.dashboards).toHaveLength(2)
      expect(result.dashboards[0].id).toBe('d1')
      expect(result.dashboards[1].id).toBe('d2')
    })

    it('overwrites navLayout with last value', () => {
      const config1: Partial<AppConfig> = { navLayout: { direction: 'row', children: [] } }
      const config2: Partial<AppConfig> = { navLayout: { direction: 'column', children: [] } }
      const result = mergeAppConfigs(config1, config2)
      expect(result.navLayout?.direction).toBe('column')
    })

    it('merges multiple configs', () => {
      const config1: Partial<AppConfig> = { nav: [{ id: 'a', label: 'A' }] }
      const config2: Partial<AppConfig> = { dashboards: [{ id: 'd1', title: 'D1', layout: [] }] }
      const config3: Partial<AppConfig> = { nav: [{ id: 'b', label: 'B' }] }
      const result = mergeAppConfigs(config1, config2, config3)
      expect(result.nav).toHaveLength(2)
      expect(result.dashboards).toHaveLength(1)
    })

    it('handles empty nav and dashboards', () => {
      const config: Partial<AppConfig> = { nav: [], dashboards: [] }
      const result = mergeAppConfigs(config)
      expect(result.nav).toEqual([])
      expect(result.dashboards).toEqual([])
    })
  })

  describe('validateAppConfig', () => {
    it('returns valid for a complete config', () => {
      const config: AppConfig = {
        nav: [{ id: 'nav1', label: 'Nav 1' }],
        dashboards: [{ id: 'dash1', title: 'Dashboard 1', layout: [] }],
      }
      const result = validateAppConfig(config)
      expect(result.valid).toBe(true)
      expect(result.errors).toEqual([])
    })

    it('returns invalid when nav is empty', () => {
      const config: AppConfig = {
        nav: [],
        dashboards: [{ id: 'dash1', title: 'Dashboard 1', layout: [] }],
      }
      const result = validateAppConfig(config)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('No navigation items defined')
    })

    it('returns invalid when dashboards is empty', () => {
      const config: AppConfig = {
        nav: [{ id: 'nav1', label: 'Nav 1' }],
        dashboards: [],
      }
      const result = validateAppConfig(config)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('No dashboards defined')
    })

    it('detects duplicate nav IDs', () => {
      const config: AppConfig = {
        nav: [
          { id: 'nav1', label: 'Nav 1' },
          { id: 'nav1', label: 'Nav 1 Duplicate' },
        ],
        dashboards: [{ id: 'dash1', title: 'Dashboard 1', layout: [] }],
      }
      const result = validateAppConfig(config)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Duplicate nav item ID: nav1')
    })

    it('detects duplicate dashboard IDs', () => {
      const config: AppConfig = {
        nav: [{ id: 'nav1', label: 'Nav 1' }],
        dashboards: [
          { id: 'dash1', title: 'Dashboard 1', layout: [] },
          { id: 'dash1', title: 'Dashboard 1 Dup', layout: [] },
        ],
      }
      const result = validateAppConfig(config)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Duplicate dashboard ID: dash1')
    })

    it('detects duplicate widget IDs within a dashboard', () => {
      const config: AppConfig = {
        nav: [{ id: 'nav1', label: 'Nav 1' }],
        dashboards: [
          {
            id: 'dash1',
            title: 'Dashboard 1',
            layout: [
              { id: 'w1', type: 'chart' } as any,
              { id: 'w1', type: 'table' } as any,
            ],
          },
        ],
      }
      const result = validateAppConfig(config)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Duplicate widget ID in dashboard dash1: w1')
    })

    it('returns multiple errors', () => {
      const config: AppConfig = {
        nav: [],
        dashboards: [],
      }
      const result = validateAppConfig(config)
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThanOrEqual(2)
    })

    it('handles missing nav array', () => {
      const config = { dashboards: [{ id: 'd1', title: 'D1', layout: [] }] } as unknown as AppConfig
      const result = validateAppConfig(config)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('No navigation items defined')
    })

    it('handles missing dashboards array', () => {
      const config = { nav: [{ id: 'n1', label: 'N1' }] } as unknown as AppConfig
      const result = validateAppConfig(config)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('No dashboards defined')
    })
  })
})
