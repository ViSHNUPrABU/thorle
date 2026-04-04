import React from 'react';
import { z } from 'zod';
import type { SDUICategory } from '../types/SDUIConfig';

export interface ComponentMetadata {
  version: string;
  category: SDUICategory;
  description: string;
  thumbnail?: string;
  tags?: string[];
}

export interface ComponentRegistration {
  component: React.ComponentType<any>;
  schema: z.ZodType<any>;
  metadata: ComponentMetadata;
  defaultProps?: Record<string, any>;
  fallback?: React.ComponentType<any>;
}

class SDUIRegistry {
  private registry = new Map<string, ComponentRegistration>();

  register(name: string, registration: ComponentRegistration): void {
    this.registry.set(name, registration);
  }

  resolve(type: string, version?: string): ComponentRegistration | null {
    if (version) {
      const versioned = this.registry.get(`${type}@${version}`);
      if (versioned) return versioned;
    }
    return this.registry.get(type) || null;
  }

  validate(type: string, props: any): { valid: boolean; errors?: z.ZodError } {
    const registration = this.resolve(type);
    if (!registration) {
      return { valid: false };
    }
    const result = registration.schema.safeParse(props);
    return { valid: result.success, errors: result.success ? undefined : result.error };
  }

  getCatalog(): Array<{
    name: string;
    version: string;
    category: string;
    description: string;
    tags?: string[];
    props: string[];
  }> {
    return Array.from(this.registry.entries()).map(([name, reg]) => ({
      name,
      version: reg.metadata.version,
      category: reg.metadata.category,
      description: reg.metadata.description,
      tags: reg.metadata.tags,
      props: reg.schema instanceof z.ZodObject && reg.schema.shape
        ? Object.keys(reg.schema.shape)
        : [],
    }));
  }

  registerBatch(components: Record<string, ComponentRegistration>): void {
    Object.entries(components).forEach(([name, reg]) => this.register(name, reg));
  }

  hasComponent(name: string): boolean {
    return this.registry.has(name);
  }

  getRegisteredNames(): string[] {
    return Array.from(this.registry.keys());
  }
}

export const sduiRegistry = new SDUIRegistry();
