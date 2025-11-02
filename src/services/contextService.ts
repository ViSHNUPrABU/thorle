// src/services/contextService.ts
import { create } from 'zustand';

interface ContextState {
  context: Record<string, any>;
  setContext: (key: string, value: any) => void;
  getContext: (key: string) => any;
  clearContext: () => void;
}

export const useContextStore = create<ContextState>((set, get) => ({
  context: {},
  
  setContext: (key: string, value: any) => {
    set((state) => ({
      context: { ...state.context, [key]: value }
    }));
  },
  
  getContext: (key: string) => {
    return get().context[key];
  },
  
  clearContext: () => {
    set({ context: {} });
  }
}));

// Helper functions for non-hook usage
export const contextService = {
  get: (key: string) => useContextStore.getState().getContext(key),
  set: (key: string, value: any) => useContextStore.getState().setContext(key, value),
  getAll: () => useContextStore.getState().context,
  clear: () => useContextStore.getState().clearContext(),
  subscribe: (callback: (state: ContextState) => void) => useContextStore.subscribe(callback),
};
