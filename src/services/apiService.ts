// src/services/apiService.ts
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { ApiDataSource } from '../types/config';
import { interpolateObject } from '../utils/templating';
import { contextService } from './contextService';

/**
 * Fetch data using axios
 */
async function fetchData(dataSource: ApiDataSource, context: Record<string, any>): Promise<any> {
  // Interpolate URL and other fields with context
  const interpolated = interpolateObject(dataSource, context);
  
  const config: AxiosRequestConfig = {
    method: interpolated.method || 'GET',
    url: interpolated.url,
    headers: interpolated.headers,
    params: interpolated.params,
    data: interpolated.body,
  };
  
  const response = await axios(config);
  return response.data;
}

/**
 * Custom hook to fetch data with react-query
 */
export function useWidgetData(
  dataSource: ApiDataSource | undefined,
  widgetId: string,
  enabled: boolean = true
) {
  const context = contextService.getAll();
  
  return useQuery({
    queryKey: ['widget', widgetId, dataSource?.url, context],
    queryFn: () => {
      if (!dataSource) {
        return Promise.resolve(null);
      }
      return fetchData(dataSource, context);
    },
    enabled: enabled && !!dataSource,
    refetchInterval: dataSource?.polling?.intervalMs || false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: dataSource?.cacheTTL || 0,
  } as UseQueryOptions);
}

/**
 * Direct API call without using react-query hook
 */
export async function fetchWidgetData(
  dataSource: ApiDataSource,
  context?: Record<string, any>
): Promise<any> {
  const ctx = context || contextService.getAll();
  return fetchData(dataSource, ctx);
}
