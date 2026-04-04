import { ActionExecutor } from './ActionExecutor'
import type { SDUIAction, SDUIComponent } from '../types/SDUIConfig'

describe('ActionExecutor', () => {
  let executor: ActionExecutor
  const mockComponent: SDUIComponent = { id: 'comp-1', type: 'Button' }

  beforeEach(() => {
    vi.spyOn(window.history, 'pushState').mockImplementation(() => {})
    vi.spyOn(window, 'dispatchEvent').mockReturnValue(true)
    vi.spyOn(window, 'open').mockReturnValue(null)
    executor = new ActionExecutor()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('navigate action', () => {
    it('calls pushState with path', () => {
      const action: SDUIAction = { type: 'navigate', trigger: 'click', payload: { path: '/dashboard' } }
      executor.execute(action, mockComponent)
      expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/dashboard')
    })

    it('dispatches popstate event', () => {
      const action: SDUIAction = { type: 'navigate', trigger: 'click', payload: { path: '/dashboard' } }
      executor.execute(action, mockComponent)
      expect(window.dispatchEvent).toHaveBeenCalled()
    })

    it('does nothing when path is missing', () => {
      const action: SDUIAction = { type: 'navigate', trigger: 'click', payload: {} }
      executor.execute(action, mockComponent)
      expect(window.history.pushState).not.toHaveBeenCalled()
    })

    it('passes state to pushState', () => {
      const action: SDUIAction = { type: 'navigate', trigger: 'click', payload: { path: '/home', state: { from: 'test' } } }
      executor.execute(action, mockComponent)
      expect(window.history.pushState).toHaveBeenCalledWith({ from: 'test' }, '', '/home')
    })
  })

  describe('open-url action', () => {
    it('calls window.open with url', () => {
      const action: SDUIAction = { type: 'open-url', trigger: 'click', payload: { url: 'https://example.com' } }
      executor.execute(action, mockComponent)
      expect(window.open).toHaveBeenCalledWith('https://example.com', '_self')
    })

    it('uses custom target', () => {
      const action: SDUIAction = { type: 'open-url', trigger: 'click', payload: { url: 'https://example.com', target: '_blank' } }
      executor.execute(action, mockComponent)
      expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank')
    })

    it('does nothing when url is missing', () => {
      const action: SDUIAction = { type: 'open-url', trigger: 'click', payload: {} }
      executor.execute(action, mockComponent)
      expect(window.open).not.toHaveBeenCalled()
    })
  })

  describe('dispatch-event action', () => {
    it('dispatches custom event', () => {
      const action: SDUIAction = { type: 'dispatch-event', trigger: 'click', payload: { event: 'my-event', data: { key: 'value' } } }
      executor.execute(action, mockComponent)
      expect(window.dispatchEvent).toHaveBeenCalled()
    })

    it('does nothing when event name is missing', () => {
      const action: SDUIAction = { type: 'dispatch-event', trigger: 'click', payload: {} }
      executor.execute(action, mockComponent)
      expect(window.dispatchEvent).not.toHaveBeenCalled()
    })
  })

  describe('custom handler', () => {
    it('registers and executes custom handler', () => {
      const handler = vi.fn()
      executor.registerCustomHandler('custom-action', handler)
      const action: SDUIAction = { type: 'custom-action', trigger: 'click', payload: { foo: 'bar' } }
      executor.execute(action, mockComponent)
      expect(handler).toHaveBeenCalledWith(action, mockComponent)
    })

    it('overwrites default handler with custom handler', () => {
      const handler = vi.fn()
      executor.registerCustomHandler('navigate', handler)
      const action: SDUIAction = { type: 'navigate', trigger: 'click', payload: { path: '/test' } }
      executor.execute(action, mockComponent)
      expect(handler).toHaveBeenCalledWith(action, mockComponent)
      expect(window.history.pushState).not.toHaveBeenCalled()
    })

    it('warns when no handler exists for action type', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const action: SDUIAction = { type: 'nonexistent', trigger: 'click', payload: {} }
      executor.execute(action, mockComponent)
      expect(warnSpy).toHaveBeenCalledWith('[SDUI] No handler for action type: nonexistent')
      warnSpy.mockRestore()
    })
  })

  describe('onAction callback', () => {
    it('calls onAction callback after executing action', () => {
      const onAction = vi.fn()
      const executorWithCallback = new ActionExecutor(onAction)
      const action: SDUIAction = { type: 'navigate', trigger: 'click', payload: { path: '/test' } }
      executorWithCallback.execute(action, mockComponent)
      expect(onAction).toHaveBeenCalledWith(action, mockComponent)
    })

    it('calls onAction even when no handler exists', () => {
      const onAction = vi.fn()
      const executorWithCallback = new ActionExecutor(onAction)
      const action: SDUIAction = { type: 'nonexistent', trigger: 'click', payload: {} }
      executorWithCallback.execute(action, mockComponent)
      expect(onAction).toHaveBeenCalledWith(action, mockComponent)
    })
  })
})
