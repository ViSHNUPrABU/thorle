import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'

const meta = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const sampleColumns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'region', label: 'Region' },
  { key: 'cpu', label: 'CPU %' },
]

const sampleData = [
  { id: '1', name: 'web-server-01', status: 'healthy', region: 'us-east-1', cpu: 45 },
  { id: '2', name: 'web-server-02', status: 'healthy', region: 'us-west-2', cpu: 62 },
  { id: '3', name: 'db-primary', status: 'warning', region: 'eu-west-1', cpu: 88 },
  { id: '4', name: 'cache-01', status: 'healthy', region: 'us-east-1', cpu: 12 },
]

export const BasicTable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
}

export const EmptyTable: Story = {
  args: {
    columns: sampleColumns,
    data: [],
  },
}
