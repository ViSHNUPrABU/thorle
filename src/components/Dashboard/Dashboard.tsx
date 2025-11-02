// src/components/Dashboard/Dashboard.tsx
import React, { useState, useCallback, useMemo } from 'react';
import GridLayout from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import type { DashboardConfig } from '../../types/config';
import { WidgetWrapper } from '../Widget/WidgetWrapper';

interface DashboardProps {
  config: DashboardConfig;
}

export const Dashboard: React.FC<DashboardProps> = ({ config }) => {
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
  
  return (
    <div style={{ 
      padding: '1.5rem',
      background: '#fafafa',
      minHeight: 'calc(100vh - 60px)',
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
          <div key={widgetConfig.id}>
            <WidgetWrapper config={widgetConfig} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};
