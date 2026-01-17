// src/components/Chart.tsx
import React, { lazy, Suspense } from 'react';
import { Loading } from './common/Loading';

const ReactECharts = lazy(() => import('echarts-for-react'));

interface ChartProps {
  data: any;
  chartType?: 'line' | 'bar' | 'area' | 'heatmap' | 'gauge' | 'custom';
  echartsOption?: any;
  title?: string;
}

export const Chart: React.FC<ChartProps> = ({ data, chartType = 'line', echartsOption, title }) => {
  // Use provided option or build default
  const option = echartsOption || buildDefaultOption(chartType, data, title);

  return (
    <Suspense fallback={<Loading message="Loading chart..." />}>
      <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
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
function buildDefaultOption(chartType: string, data: any, title?: string): any {
  const baseOption = {
    title: {
      text: title || '',
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
    const xData = data.map((item: any) => item.x || item.timestamp || item.name || item.label);
    const yData = data.map((item: any) => item.y || item.value);

    switch (chartType) {
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
            data: [{ value: yData[0] || 0, name: title || 'Value' }],
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

  // If data has specific structure (e.g., { series: [...], xAxis: [...] })
  if (data?.series && data?.xAxis) {
    return {
      ...baseOption,
      xAxis: { type: 'category', data: data.xAxis },
      yAxis: { type: 'value' },
      series: data.series,
    };
  }

  // Return a basic option if data format is unknown
  return baseOption;
}
