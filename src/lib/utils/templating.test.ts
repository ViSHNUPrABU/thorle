import { interpolateTemplate, interpolateObject } from './templating'

describe('templating', () => {
  describe('interpolateTemplate', () => {
    it('replaces simple key', () => {
      const result = interpolateTemplate('Hello {{name}}', { name: 'World' })
      expect(result).toBe('Hello World')
    })

    it('replaces nested key with dot notation', () => {
      const result = interpolateTemplate('/api/{{server.host}}', { server: { host: 'localhost' } })
      expect(result).toBe('/api/localhost')
    })

    it('replaces multiple keys', () => {
      const result = interpolateTemplate('{{greeting}} {{name}}', { greeting: 'Hello', name: 'World' })
      expect(result).toBe('Hello World')
    })

    it('leaves unmatched keys as-is', () => {
      const result = interpolateTemplate('Hello {{missing}}', {})
      expect(result).toBe('Hello {{missing}}')
    })

    it('handles trimmed keys', () => {
      const result = interpolateTemplate('Hello {{ name }}', { name: 'World' })
      expect(result).toBe('Hello World')
    })

    it('handles numeric values', () => {
      const result = interpolateTemplate('Port: {{port}}', { port: 8080 })
      expect(result).toBe('Port: 8080')
    })

    it('handles boolean values', () => {
      const result = interpolateTemplate('Enabled: {{flag}}', { flag: true })
      expect(result).toBe('Enabled: true')
    })

    it('returns original string when no placeholders', () => {
      const result = interpolateTemplate('No placeholders', { key: 'value' })
      expect(result).toBe('No placeholders')
    })

    it('handles empty context', () => {
      const result = interpolateTemplate('Hello {{name}}', {})
      expect(result).toBe('Hello {{name}}')
    })

    it('handles deeply nested paths', () => {
      const result = interpolateTemplate('{{a.b.c.d}}', { a: { b: { c: { d: 'deep' } } } })
      expect(result).toBe('deep')
    })

    it('handles undefined nested value', () => {
      const result = interpolateTemplate('{{a.b}}', { a: {} })
      expect(result).toBe('{{a.b}}')
    })
  })

  describe('interpolateObject', () => {
    it('interpolates string values', () => {
      const result = interpolateObject({ url: '/api/{{host}}' }, { host: 'localhost' })
      expect(result).toEqual({ url: '/api/localhost' })
    })

    it('interpolates nested objects', () => {
      const result = interpolateObject(
        { config: { url: '/api/{{host}}' } },
        { host: 'localhost' }
      )
      expect(result).toEqual({ config: { url: '/api/localhost' } })
    })

    it('interpolates arrays', () => {
      const result = interpolateObject(
        { urls: ['/api/{{host}}', '/ws/{{host}}'] },
        { host: 'localhost' }
      )
      expect(result).toEqual({ urls: ['/api/localhost', '/ws/localhost'] })
    })

    it('preserves non-string values', () => {
      const result = interpolateObject({ count: 42, flag: true }, { host: 'x' })
      expect(result).toEqual({ count: 42, flag: true })
    })

    it('preserves null values', () => {
      const result = interpolateObject({ val: null }, { host: 'x' })
      expect(result).toEqual({ val: null })
    })

    it('handles arrays of objects', () => {
      const result = interpolateObject(
        { items: [{ name: '{{user}}' }, { name: '{{admin}}' }] },
        { user: 'alice', admin: 'bob' }
      )
      expect(result).toEqual({ items: [{ name: 'alice' }, { name: 'bob' }] })
    })

    it('returns primitive values unchanged', () => {
      expect(interpolateObject(42, {})).toBe(42)
      expect(interpolateObject('no-template', {})).toBe('no-template')
      expect(interpolateObject(true, {})).toBe(true)
    })

    it('handles mixed nested structures', () => {
      const result = interpolateObject(
        {
          name: '{{name}}',
          count: 5,
          nested: { path: '{{path}}' },
          list: ['{{item}}', 42],
        },
        { name: 'test', path: '/api', item: 'hello' }
      )
      expect(result).toEqual({
        name: 'test',
        count: 5,
        nested: { path: '/api' },
        list: ['hello', 42],
      })
    })
  })
})
