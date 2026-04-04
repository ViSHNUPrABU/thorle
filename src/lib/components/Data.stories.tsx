// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { Data } from './Data'

const meta = {
  title: 'Data Display/Data',
  component: Data,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['stat', 'list', 'kpi'] },
  },
} satisfies Meta<typeof Data>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = {
  revenue: 45231,
  users: 1234,
  growth: 12.5,
  uptime: 99.9,
}

const sampleFields = [
  { key: 'revenue', label: 'Revenue', format: 'number' },
  { key: 'users', label: 'Active Users' },
  { key: 'growth', label: 'Growth', format: 'percent' },
  { key: 'uptime', label: 'Uptime', format: 'percent' },
]

export const StatLayout: Story = {
  args: {
    data: sampleData,
    layout: 'stat',
    fields: sampleFields,
  },
}

export const ListLayout: Story = {
  args: {
    data: sampleData,
    layout: 'list',
    fields: sampleFields,
  },
}

export const KPILayout: Story = {
  args: {
    data: sampleData,
    layout: 'kpi',
    fields: sampleFields,
  },
}

export const StatWithBytes: Story = {
  args: {
    data: {
      total: 5368709120,
      used: 2147483648,
      free: 3221225472,
    },
    layout: 'stat',
    fields: [
      { key: 'total', label: 'Total Storage', format: 'bytes' },
      { key: 'used', label: 'Used', format: 'bytes' },
      { key: 'free', label: 'Free', format: 'bytes' },
    ],
  },
}

export const ListWithNullValues: Story = {
  args: {
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: null,
      address: undefined,
    },
    layout: 'list',
    fields: [
      { key: 'name', label: 'Full Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'address', label: 'Address' },
    ],
  },
}

export const KPIWithCustomFormat: Story = {
  args: {
    data: {
      requests: 15234,
      latency: 42,
      errors: 3,
    },
    layout: 'kpi',
    fields: [
      { key: 'requests', label: 'Total Requests', format: '{value} req/s' },
      { key: 'latency', label: 'Avg Latency', format: '{value}ms' },
      { key: 'errors', label: 'Errors', format: '{value}%' },
    ],
  },
}
