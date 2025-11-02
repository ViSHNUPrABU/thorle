// src/components/Widget/ChartWidget.tsx
import React, { lazy, Suspense } from 'react';
import type { ChartWidgetConfig } from '../../types/config';
import { Loading } from '../common/Loading';

const ReactECharts = lazy(() => import('echarts-for-react'));

interface ChartWidgetProps {
  config: ChartWidgetConfig;
  data: any;
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({ config, data }) => {
  // Build ECharts option from config
  const option = config.echartsOption || buildDefaultOption(config, data);
  
  return (
    <Suspense fallback={<Loading message="Loading chart..." />}>
      <div style={{ width: '100%', height: '100%' }}>
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </Suspense>
  );
};

/**
 * Build a default ECharts option based on chartType and data
 */
function buildDefaultOption(config: ChartWidgetConfig, data: any): any {
  const baseOption = {
    title: {
      text: config.title || '',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
  };
  
  // If data is array format
  if (Array.isArray(data)) {
    const xData = data.map((item: any) => item.x || item.timestamp || item.name);
    const yData = data.map((item: any) => item.y || item.value);
    
    switch (config.chartType) {
      case 'line':
        return {
          ...baseOption,
          xAxis: { type: 'category', data: xData },
          yAxis: { type: 'value' },
          series: [{ data: yData, type: 'line', smooth: true }],
        };
      
      case 'bar':
        return {
          ...baseOption,
          xAxis: { type: 'category', data: xData },
          yAxis: { type: 'value' },
          series: [{ data: yData, type: 'bar' }],
        };
      
      case 'area':
        return {
          ...baseOption,
          xAxis: { type: 'category', data: xData },
          yAxis: { type: 'value' },
          series: [{ 
            data: yData, 
            type: 'line', 
            smooth: true,
            areaStyle: {},
          }],
        };
      
      case 'gauge':
        return {
          ...baseOption,
          series: [{
            type: 'gauge',
            data: [{ value: yData[0] || 0, name: config.title || 'Value' }],
          }],
        };
      
      default:
        return {
          ...baseOption,
          xAxis: { type: 'category', data: xData },
          yAxis: { type: 'value' },
          series: [{ data: yData, type: 'line' }],
        };
    }
  }
  
  // Return a basic option if data format is unknown
  return baseOption;
}
