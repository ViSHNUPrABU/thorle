import type { SDUIAction, SDUIComponent } from '../types/SDUIConfig';

type ActionHandler = (action: SDUIAction, component: SDUIComponent) => void;

export class ActionExecutor {
  private handlers: Map<string, ActionHandler> = new Map();
  private onAction?: ActionHandler;

  constructor(onAction?: ActionHandler) {
    this.onAction = onAction;
    this.registerDefaultHandlers();
  }

  private registerDefaultHandlers(): void {
    this.handlers.set('navigate', (action) => {
      const { path, state } = action.payload;
      if (path) {
        window.history.pushState(state || {}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    });

    this.handlers.set('open-url', (action) => {
      const { url, target = '_self' } = action.payload;
      if (url) {
        window.open(url, target);
      }
    });

    this.handlers.set('dispatch-event', (action) => {
      const { event, data } = action.payload;
      if (event) {
        window.dispatchEvent(new CustomEvent(event, { detail: data }));
      }
    });
  }

  registerCustomHandler(type: string, handler: ActionHandler): void {
    this.handlers.set(type, handler);
  }

  execute(action: SDUIAction, component: SDUIComponent): void {
    const handler = this.handlers.get(action.type);
    if (handler) {
      handler(action, component);
    } else {
      console.warn(`[SDUI] No handler for action type: ${action.type}`);
    }
    this.onAction?.(action, component);
  }
}
