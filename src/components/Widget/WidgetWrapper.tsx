// src/components/Widget/WidgetWrapper.tsx
import React, { useEffect } from 'react';
import type { WidgetConfig } from '../../types/config';
import { useWidgetData } from '../../services/apiService';
import { useContextStore } from '../../services/contextService';
import { evaluateVisibility } from '../../utils/visibility';
import { Loading } from '../common/Loading';
import { Empty } from '../common/Empty';
import { ErrorDisplay } from '../common/Error';
import { ChartWidget } from './ChartWidget';
import { TableWidget } from './TableWidget';
import { DataWidget } from './DataWidget';

interface WidgetWrapperProps {
  config: WidgetConfig;
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ config }) => {
  const context = useContextStore(state => state.context);
  const setContext = useContextStore(state => state.setContext);
  
  // Evaluate visibility
  const isVisible = evaluateVisibility(config.visibility, context);
  
  // Fetch data
  const { data, isLoading, error, refetch } = useWidgetData(
    config.dataSource,
    config.id,
    isVisible
  );
  
  // Publish data to context if contextBindings exist
  useEffect(() => {
    if (config.contextBindings && data) {
      config.contextBindings.forEach(key => {
        setContext(key, data);
      });
    }
  }, [data, config.contextBindings, setContext]);
  
  // Don't render if not visible
  if (!isVisible) {
    return null;
  }
  
  // Render widget with header
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    }}>
      {config.title && (
        <div style={{
          padding: '1rem',
          borderBottom: '1px solid #e0e0e0',
          fontWeight: 600,
          fontSize: '1rem',
          color: '#333',
        }}>
          {config.title}
        </div>
      )}
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        minHeight: 0,
      }}>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorDisplay error={error as Error} onRetry={() => refetch()} />
        ) : !data ? (
          <Empty />
        ) : (
          <WidgetContent config={config} data={data as any} />
        )}
      </div>
    </div>
  );
};

interface WidgetContentProps {
  config: WidgetConfig;
  data: any;
}

const WidgetContent: React.FC<WidgetContentProps> = ({ config, data }) => {
  switch (config.type) {
    case 'chart':
      return <ChartWidget config={config} data={data} />;
    case 'table':
      return <TableWidget config={config} data={data} />;
    case 'data':
      return <DataWidget config={config} data={data} />;
    default:
      return <Empty message="Unknown widget type" />;
  }
};
