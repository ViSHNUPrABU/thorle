// src/components/ComponentWrapper.tsx
import React from 'react';
import type { ComponentWrapperProps } from '../types/config';
import { useWidgetData } from '../services/apiService';
import { useContextStore } from '../services/contextService';
import { evaluateVisibility } from '../utils/visibility';
import { getComponent } from '../services/componentRegistry';
import { Loading } from './common/Loading';
import { ErrorDisplay } from './common/Error';
import { Empty } from './common/Empty';

/**
 * Universal component wrapper that handles:
 * - Data fetching with caching
 * - Loading/error/empty states
 * - Visibility evaluation
 * - Component registry resolution
 */
export const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  component,
  componentProps = {},
  dataSource,
  visibility,
  cacheTTL,
  renderLoading,
  renderError,
  renderEmpty,
  children,
}) => {
  const context = useContextStore((state) => state.context);

  // Evaluate visibility
  if (visibility && !evaluateVisibility(visibility, context)) {
    return null;
  }

  // Fetch data if dataSource provided
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useWidgetData(
    dataSource ? { ...dataSource, cacheTTL } : undefined,
    `component-${typeof component === 'string' ? component : 'anonymous'}`,
    true
  );

  // Resolve component from registry if string
  const ResolvedComponent = React.useMemo(() => {
    if (typeof component === 'string') {
      const registered = getComponent(component);
      if (!registered) {
        console.warn(`Component "${component}" not found in registry`);
        return null;
      }
      return registered;
    }
    return component;
  }, [component]);

  // Render loading state
  if (dataSource && isLoading) {
    if (renderLoading) {
      return <>{renderLoading()}</>;
    }
    return <Loading />;
  }

  // Render error state
  if (dataSource && error) {
    if (renderError) {
      return <>{renderError(error as Error, refetch)}</>;
    }
    return <ErrorDisplay error={error as Error} onRetry={refetch} />;
  }

  // Render empty state
  if (dataSource && !data) {
    if (renderEmpty) {
      return <>{renderEmpty()}</>;
    }
    return <Empty />;
  }

  // Component not found
  if (!ResolvedComponent) {
    return (
      <div style={{ padding: '1rem', color: '#d32f2f' }}>
        Component not found: {typeof component === 'string' ? component : 'unknown'}
      </div>
    );
  }

  // Render component with data
  const finalProps = {
    ...componentProps,
    ...(dataSource && data ? { data } : {}),
  };

  return (
    <>
      <ResolvedComponent {...finalProps} />
      {children}
    </>
  );
};
