import type { Meta, StoryObj } from '@storybook/react'
import { Chart } from './Chart'

const meta = {
  title: 'Data Display/Chart',
  component: Chart,
  tags: ['autodocs'],
  argTypes: {
    chartType: { control: 'select', options: ['line', 'bar', 'area', 'pie'] },
    title: { control: 'text' },
  },
} satisfies Meta<typeof Chart>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  { time: '00:00', value: 30, value2: 20 },
  { time: '04:00', value: 45, value2: 35 },
  { time: '08:00', value: 60, value2: 50 },
  { time: '12:00', value: 55, value2: 40 },
  { time: '16:00', value: 70, value2: 60 },
  { time: '20:00', value: 40, value2: 25 },
]

export const LineChart: Story = {
  args: {
    chartType: 'line',
    title: 'CPU Usage Over Time',
    data: sampleData,
    config: {
      xAxis: 'time',
      series: [{ key: 'value', label: 'CPU %', color: '#4c8bff' }],
    },
  },
}

export const BarChart: Story = {
  args: {
    chartType: 'bar',
    title: 'Request Count by Hour',
    data: sampleData,
    config: {
      xAxis: 'time',
      series: [{ key: 'value', label: 'Requests', color: '#3dd68c' }],
    },
  },
}

export const MultiSeriesLine: Story = {
  args: {
    chartType: 'line',
    title: 'CPU vs Memory',
    data: sampleData,
    config: {
      xAxis: 'time',
      series: [
        { key: 'value', label: 'CPU %', color: '#4c8bff' },
        { key: 'value2', label: 'Memory %', color: '#a55eea' },
      ],
    },
  },
}
