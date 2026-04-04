import React, { useMemo } from 'react';
import type { SDUIComponent, SDUIConfig } from '../types/SDUIConfig';
import { sduiRegistry } from '../registry/Registry';
import { ActionExecutor } from './ActionExecutor';
import { useWidgetData } from '../../services/apiService';
import { useContextStore } from '../../services/contextService';
import { evaluateVisibility } from '../../utils/visibility';

interface SDUIRendererProps {
  config: SDUIConfig | SDUIComponent[];
  context?: Record<string, any>;
  onAction?: (action: any, component: SDUIComponent) => void;
  className?: string;
}

export const SDUIRenderer: React.FC<SDUIRendererProps> = ({
  config,
  context,
  onAction,
  className,
}) => {
  const storeContext = useContextStore((state) => state.context);
  const evalContext = context || storeContext;
  const components = Array.isArray(config) ? config : config.components;
  const actionExecutor = useMemo(() => new ActionExecutor(onAction), [onAction]);

  const renderComponent = (component: SDUIComponent): React.ReactNode => {
    if (component.visibility && !evaluateVisibility(component.visibility as any, evalContext)) {
      return null;
    }

    const registration = sduiRegistry.resolve(component.type, component.version);

    if (!registration) {
      console.warn(`[SDUI] Component "${component.type}" not found in registry`);
      return (
        <div key={component.id} className="p-4 text-red-600 bg-red-50 rounded">
          Unknown component: {component.type}
        </div>
      );
    }

    const validation = sduiRegistry.validate(component.type, component.props);
    if (!validation.valid) {
      console.warn(`[SDUI] Invalid props for "${component.type}":`, validation.errors?.message);
      if (registration.fallback) {
        const Fallback = registration.fallback;
        return <Fallback key={component.id} />;
      }
    }

    const mergedProps: Record<string, any> = {
      ...registration.defaultProps,
      ...component.props,
      id: component.id,
    };

    if (component.actions) {
      mergedProps.onAction = (action: any) => actionExecutor.execute(action, component);
    }

    if (component.children) {
      mergedProps.children = component.children.map((child) => renderComponent(child));
    }

    if (component.dataSource) {
      return (
        <DataWrapper
          key={component.id}
          component={component}
          props={mergedProps}
          registration={registration}
        />
      );
    }

    const Component = registration.component;
    return <Component key={component.id} {...mergedProps} />;
  };

  return <div className={className}>{components.map((comp) => renderComponent(comp))}</div>;
};

const DataWrapper: React.FC<{
  component: SDUIComponent;
  props: Record<string, any>;
  registration: any;
}> = ({ component, props, registration }) => {
  const dataSource = component.dataSource ? {
    ...component.dataSource,
    cacheTTL: component.dataSource.cacheTTL,
  } : undefined;

  const { data, isLoading, error, refetch } = useWidgetData(
    dataSource as any,
    component.id,
    true
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded">
        <p className="font-medium">Error loading data</p>
        <p className="text-sm mt-1">{(error as Error).message}</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  const Component = registration.component;
  return <Component key={component.id} {...props} data={data} />;
};
