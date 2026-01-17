// src/services/componentRegistry.ts
import React from 'react';

const registry = new Map<string, React.ComponentType<any>>();

/**
 * Register a single component
 */
export const registerComponent = (name: string, component: React.ComponentType<any>): void => {
  registry.set(name, component);
};

/**
 * Get a registered component by name
 */
export const getComponent = (name: string): React.ComponentType<any> | undefined => {
  return registry.get(name);
};

/**
 * Register multiple components at once
 */
export const registerBatch = (components: Record<string, React.ComponentType<any>>): void => {
  Object.entries(components).forEach(([name, component]) => {
    registerComponent(name, component);
  });
};

/**
 * Check if a component is registered
 */
export const hasComponent = (name: string): boolean => {
  return registry.has(name);
};

/**
 * Get all registered component names
 */
export const getRegisteredNames = (): string[] => {
  return Array.from(registry.keys());
};
