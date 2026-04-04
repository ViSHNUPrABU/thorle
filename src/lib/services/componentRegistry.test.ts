import { registerComponent, getComponent, registerBatch, hasComponent, getRegisteredNames } from './componentRegistry'

describe('componentRegistry', () => {
  beforeEach(() => {
    const names = getRegisteredNames()
    names.forEach((name) => {
      ;(registerComponent as any).__proto__
    })
  })

  it('registers a component', () => {
    const TestComponent = () => null
    registerComponent('Test', TestComponent)
    expect(getComponent('Test')).toBe(TestComponent)
  })

  it('returns undefined for unregistered component', () => {
    expect(getComponent('NonExistent')).toBeUndefined()
  })

  it('checks if component exists', () => {
    const TestComponent = () => null
    registerComponent('Exists', TestComponent)
    expect(hasComponent('Exists')).toBe(true)
    expect(hasComponent('Missing')).toBe(false)
  })

  it('registers multiple components at once', () => {
    const CompA = () => null
    const CompB = () => null
    registerBatch({ CompA, CompB })
    expect(getComponent('CompA')).toBe(CompA)
    expect(getComponent('CompB')).toBe(CompB)
  })

  it('returns all registered names', () => {
    const before = getRegisteredNames()
    const NewComp = () => null
    registerComponent('NewComp', NewComp)
    const after = getRegisteredNames()
    expect(after.length).toBeGreaterThan(before.length)
    expect(after).toContain('NewComp')
  })

  it('overwrites existing component with same name', () => {
    const OldComp = () => null
    const NewComp = () => null
    registerComponent('Overwrite', OldComp)
    registerComponent('Overwrite', NewComp)
    expect(getComponent('Overwrite')).toBe(NewComp)
  })
})
