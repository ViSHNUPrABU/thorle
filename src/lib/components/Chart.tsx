import React, { lazy, Suspense } from 'react'
import { z } from 'zod'
import { Loading } from './common/Loading'
import { sduiRegistry } from '../sdui/registry/Registry'

const ReactECharts = lazy(() => import('echarts-for-react'))

interface ChartDataPoint {
  x?: string | number
  y?: string | number
  timestamp?: string
  name?: string
  label?: string
  value?: string | number
}

export interface ChartProps {
  data: ChartDataPoint[] | Record<string, unknown>
  chartType?: 'line' | 'bar' | 'area' | 'heatmap' | 'gauge' | 'custom'
  echartsOption?: Record<string, unknown>
  title?: string
}

export const Chart: React.FC<ChartProps> = ({ data, chartType = 'line', echartsOption, title }) => {
  const option = echartsOption ?? buildDefaultOption(chartType, data, title)

  return (
    <Suspense fallback={<Loading message="Loading chart..." />}>
      <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          notMerge
          lazyUpdate
        />
      </div>
    </Suspense>
  )
}

function buildDefaultOption(
  chartType: string,
  data: ChartDataPoint[] | Record<string, unknown>,
  title?: string,
): Record<string, unknown> {
  const baseOption = {
    title: { text: title ?? '', left: 'center' },
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  }

  if (Array.isArray(data)) {
    const xData = data.map(item => item.x ?? item.timestamp ?? item.name ?? item.label)
    const yData = data.map(item => item.y ?? item.value)

    switch (chartType) {
      case 'line':
        return { ...baseOption, xAxis: { type: 'category', data: xData }, yAxis: { type: 'value' }, series: [{ data: yData, type: 'line', smooth: true }] }
      case 'bar':
        return { ...baseOption, xAxis: { type: 'category', data: xData }, yAxis: { type: 'value' }, series: [{ data: yData, type: 'bar' }] }
      case 'area':
        return { ...baseOption, xAxis: { type: 'category', data: xData }, yAxis: { type: 'value' }, series: [{ data: yData, type: 'line', smooth: true, areaStyle: {} }] }
      case 'gauge':
        return { ...baseOption, series: [{ type: 'gauge', data: [{ value: yData[0] ?? 0, name: title ?? 'Value' }] }] }
      case 'heatmap':
        return { ...baseOption, xAxis: { type: 'category', data: xData }, yAxis: { type: 'category', data: xData }, series: [{ type: 'heatmap', data: yData.map((v, i) => [i % 5, Math.floor(i / 5), v]), label: { show: true } }] }
      case 'custom':
        return baseOption
      default:
        return { ...baseOption, xAxis: { type: 'category', data: xData }, yAxis: { type: 'value' }, series: [{ data: yData, type: 'line' }] }
    }
  }

  if (data && typeof data === 'object' && 'series' in data && 'xAxis' in data) {
    return { ...baseOption, xAxis: { type: 'category', data: (data as Record<string, unknown>).xAxis }, yAxis: { type: 'value' }, series: (data as Record<string, unknown>).series }
  }

  return baseOption
}

const ChartPropsSchema = z.object({
  chartType: z.enum(['line', 'bar', 'area', 'heatmap', 'gauge', 'custom']).default('line'),
  echartsOption: z.record(z.string(), z.unknown()).optional(),
  title: z.string().optional(),
  data: z.unknown().optional(),
})

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
})
