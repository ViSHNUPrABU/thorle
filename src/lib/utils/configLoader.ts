// src/utils/configLoader.ts
import type { AppConfig, DashboardLayoutConfig, StaticLayoutConfig } from '../types/config';

/**
 * Utility to load and merge app configurations from multiple sources
 * This demonstrates how to make the config truly dynamic by fetching from APIs
 */

/**
 * Load dashboards from an API endpoint
 */
export async function loadDashboardsFromAPI(apiUrl: string): Promise<DashboardLayoutConfig[]> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboards: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading dashboards from API:', error);
    return [];
  }
}

/**
 * Load nav layout from an API endpoint
 */
export async function loadNavLayoutFromAPI(apiUrl: string): Promise<StaticLayoutConfig | null> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch nav layout: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading nav layout from API:', error);
    return null;
  }
}

/**
 * Merge multiple app configs
 */
export function mergeAppConfigs(...configs: Partial<AppConfig>[]): AppConfig {
  const merged: AppConfig = {
    nav: [],
    dashboards: [],
  };

  for (const config of configs) {
    if (config.nav) {
      merged.nav = [...merged.nav, ...config.nav];
    }
    if (config.dashboards) {
      merged.dashboards = [...merged.dashboards, ...config.dashboards];
    }
    if (config.navLayout) {
      merged.navLayout = config.navLayout;
    }
  }

  return merged;
}

/**
 * Load complete app config from multiple sources
 */
export async function loadAppConfig(options: {
  staticConfig?: AppConfig;
  dashboardsApiUrl?: string;
  navLayoutApiUrl?: string;
}): Promise<AppConfig> {
  const configs: Partial<AppConfig>[] = [];

  // Add static config if provided
  if (options.staticConfig) {
    configs.push(options.staticConfig);
  }

  // Load dashboards from API
  if (options.dashboardsApiUrl) {
    const dashboards = await loadDashboardsFromAPI(options.dashboardsApiUrl);
    if (dashboards.length > 0) {
      configs.push({ dashboards });
    }
  }

  // Load nav layout from API
  if (options.navLayoutApiUrl) {
    const navLayout = await loadNavLayoutFromAPI(options.navLayoutApiUrl);
    if (navLayout) {
      configs.push({ navLayout });
    }
  }

  return mergeAppConfigs(...configs);
}

/**
 * Validate app config
 */
export function validateAppConfig(config: AppConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check nav items
  if (!config.nav || config.nav.length === 0) {
    errors.push('No navigation items defined');
  }

  // Check for duplicate nav IDs
  const navIds = new Set<string>();
  for (const item of config.nav || []) {
    if (navIds.has(item.id)) {
      errors.push(`Duplicate nav item ID: ${item.id}`);
    }
    navIds.add(item.id);
  }

  // Check dashboards
  if (!config.dashboards || config.dashboards.length === 0) {
    errors.push('No dashboards defined');
  }

  // Check for duplicate dashboard IDs
  const dashboardIds = new Set<string>();
  for (const dashboard of config.dashboards || []) {
    if (dashboardIds.has(dashboard.id)) {
      errors.push(`Duplicate dashboard ID: ${dashboard.id}`);
    }
    dashboardIds.add(dashboard.id);

    // Check for duplicate widget IDs within dashboard
    const widgetIds = new Set<string>();
    for (const widget of dashboard.layout || []) {
      if (widgetIds.has(widget.id)) {
        errors.push(`Duplicate widget ID in dashboard ${dashboard.id}: ${widget.id}`);
      }
      widgetIds.add(widget.id);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Example: Load config with fallback
 */
export async function loadAppConfigWithFallback(
  primaryApiUrl: string,
  fallbackConfig: AppConfig
): Promise<AppConfig> {
  try {
    const response = await fetch(primaryApiUrl);
    if (!response.ok) {
      throw new Error('Primary config API failed');
    }
    const apiConfig = await response.json();
    
    // Validate the loaded config
    const validation = validateAppConfig(apiConfig);
    if (!validation.valid) {
      console.error('Invalid config from API:', validation.errors);
      return fallbackConfig;
    }
    
    return apiConfig;
  } catch (error) {
    console.error('Error loading primary config, using fallback:', error);
    return fallbackConfig;
  }
}
