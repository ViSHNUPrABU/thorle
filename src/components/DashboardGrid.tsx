// src/components/DashboardGrid.tsx
import React, { useState, useCallback, useMemo } from 'react';
import GridLayout from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import type { DashboardLayoutConfig, WidgetConfig } from '../types/config';
import { ComponentWrapper } from './ComponentWrapper';
import { Chart } from './Chart';
import { Table } from './Table';
import { Data } from './Data';

interface DashboardGridProps {
  config: DashboardLayoutConfig;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({ config }) => {
  // Build initial layout from widget configs
  const initialLayout = useMemo(() => {
    return config.layout.map(widget => ({
      i: widget.id,
      x: widget.position?.x || 0,
      y: widget.position?.y || 0,
      w: widget.position?.w || 6,
      h: widget.position?.h || 4,
      minW: widget.position?.minW || 2,
      minH: widget.position?.minH || 2,
    }));
  }, [config.layout]);

  const [layout, setLayout] = useState<Layout[]>(initialLayout);

  // Load layout from localStorage
  React.useEffect(() => {
    const savedLayout = localStorage.getItem(`dashboard-layout-${config.id}`);
    if (savedLayout) {
      try {
        setLayout(JSON.parse(savedLayout));
      } catch (e) {
        console.error('Failed to load saved layout:', e);
      }
    }
  }, [config.id]);

  // Handle layout change
  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem(`dashboard-layout-${config.id}`, JSON.stringify(newLayout));
  }, [config.id]);

  // Render widget based on type
  const renderWidget = (widgetConfig: WidgetConfig) => {
    const widgetProps: any = {};

    if (widgetConfig.type === 'chart') {
      widgetProps.component = Chart;
      widgetProps.componentProps = {
        chartType: widgetConfig.chartType,
        echartsOption: widgetConfig.echartsOption,
        title: widgetConfig.title,
      };
    } else if (widgetConfig.type === 'table') {
      widgetProps.component = Table;
      widgetProps.componentProps = {
        columns: widgetConfig.columns,
        enablePagination: widgetConfig.pagination?.mode === 'client',
        pageSize: widgetConfig.pagination?.pageSize || 10,
      };
    } else if (widgetConfig.type === 'data') {
      widgetProps.component = Data;
      widgetProps.componentProps = {
        layout: widgetConfig.layout,
        fields: widgetConfig.fields,
      };
    }

    return (
      <ComponentWrapper
        {...widgetProps}
        dataSource={widgetConfig.dataSource}
        visibility={widgetConfig.visibility}
        cacheTTL={widgetConfig.dataSource?.cacheTTL}
      />
    );
  };

  return (
    <div style={{
      padding: '1.5rem',
      background: '#fafafa',
      minHeight: '100%',
      height: '100%',
      overflow: 'auto',
    }}>
      <div style={{
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
          {config.title}
        </h2>
        <button
          onClick={() => {
            setLayout(initialLayout);
            localStorage.removeItem(`dashboard-layout-${config.id}`);
          }}
          style={{
            padding: '0.5rem 1rem',
            background: '#f5f5f5',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Reset Layout
        </button>
      </div>

      <GridLayout
        layout={layout}
        onLayoutChange={handleLayoutChange}
        cols={12}
        rowHeight={80}
        width={1200}
        isDraggable={true}
        isResizable={true}
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        {config.layout.map(widgetConfig => (
          <div
            key={widgetConfig.id}
            style={{
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {widgetConfig.title && (
              <div style={{
                padding: '1rem',
                borderBottom: '1px solid #e0e0e0',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#333',
              }}>
                {widgetConfig.title}
              </div>
            )}
            <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
              {renderWidget(widgetConfig)}
            </div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};
