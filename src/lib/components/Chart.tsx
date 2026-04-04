import React, { lazy, Suspense } from 'react';
import { z } from 'zod';
import { Loading } from './common/Loading';
import { sduiRegistry } from '../sdui/registry/Registry';

const ReactECharts = lazy(() => import('echarts-for-react'));

interface ChartProps {
  data: any;
  chartType?: 'line' | 'bar' | 'area' | 'heatmap' | 'gauge' | 'custom';
  echartsOption?: any;
  title?: string;
}

export const Chart: React.FC<ChartProps> = ({ data, chartType = 'line', echartsOption, title }) => {
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

function buildDefaultOption(chartType: string, data: any, title?: string): any {
  const baseOption = {
    title: { text: title || '', left: 'center' },
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  };

  if (Array.isArray(data)) {
    const xData = data.map((item: any) => item.x || item.timestamp || item.name || item.label);
    const yData = data.map((item: any) => item.y || item.value);

    switch (chartType) {
      case 'line':
        return { ...baseOption, xAxis: { type: 'category', data: xData }, yAxis: { type: 'value' }, series: [{ data: yData, type: 'line', smooth: true }] };
      case 'bar':
        return { ...baseOption, xAxis: { type: 'category', data: xData }, yAxis: { type: 'value' }, series: [{ data: yData, type: 'bar' }] };
      case 'area':
        return { ...baseOption, xAxis: { type: 'category', data: xData }, yAxis: { type: 'value' }, series: [{ data: yData, type: 'line', smooth: true, areaStyle: {} }] };
      case 'gauge':
        return { ...baseOption, series: [{ type: 'gauge', data: [{ value: yData[0] || 0, name: title || 'Value' }] }] };
      default:
        return { ...baseOption, xAxis: { type: 'category', data: xData }, yAxis: { type: 'value' }, series: [{ data: yData, type: 'line' }] };
    }
  }

  if (data?.series && data?.xAxis) {
    return { ...baseOption, xAxis: { type: 'category', data: data.xAxis }, yAxis: { type: 'value' }, series: data.series };
  }

  return baseOption;
}

const ChartPropsSchema = z.object({
  chartType: z.enum(['line', 'bar', 'area', 'heatmap', 'gauge', 'custom']).default('line'),
  echartsOption: z.record(z.any()).optional(),
  title: z.string().optional(),
  data: z.any().optional(),
});

sduiRegistry.register('Chart', {
  component: Chart,
  schema: ChartPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'data-display',
    description: 'ECharts-based chart component supporting line, bar, area, heatmap, gauge, and custom charts',
    tags: ['chart', 'visualization', 'echarts', 'graph'],
  },
  defaultProps: { chartType: 'line' },
});
