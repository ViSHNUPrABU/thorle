import { contextService } from './contextService'

describe('contextService', () => {
  beforeEach(() => {
    contextService.clear()
  })

  it('sets and gets a value', () => {
    contextService.set('key1', 'value1')
    expect(contextService.get('key1')).toBe('value1')
  })

  it('returns undefined for missing key', () => {
    expect(contextService.get('missing')).toBeUndefined()
  })

  it('gets all context values', () => {
    contextService.set('a', 1)
    contextService.set('b', 2)
    const all = contextService.getAll()
    expect(all).toEqual({ a: 1, b: 2 })
  })

  it('clears all context', () => {
    contextService.set('a', 1)
    contextService.set('b', 2)
    contextService.clear()
    expect(contextService.getAll()).toEqual({})
  })

  it('overwrites existing key', () => {
    contextService.set('key', 'old')
    contextService.set('key', 'new')
    expect(contextService.get('key')).toBe('new')
  })

  it('stores objects', () => {
    const obj = { nested: { value: 42 } }
    contextService.set('obj', obj)
    expect(contextService.get('obj')).toEqual(obj)
  })

  it('stores arrays', () => {
    const arr = [1, 2, 3]
    contextService.set('arr', arr)
    expect(contextService.get('arr')).toEqual(arr)
  })

  it('stores null', () => {
    contextService.set('nullKey', null)
    expect(contextService.get('nullKey')).toBeNull()
  })

  it('subscribes to state changes', () => {
    const callback = vi.fn()
    contextService.subscribe(callback)
    contextService.set('test', 'value')
    expect(callback).toHaveBeenCalled()
  })
})
