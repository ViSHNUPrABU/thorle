// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Tabs } from './Tabs'

const meta = {
  title: 'Layout/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const sampleTabs = [
  { label: 'Overview', value: 'overview', content: <div style={{ padding: '1rem' }}>Overview content goes here</div> },
  { label: 'Settings', value: 'settings', content: <div style={{ padding: '1rem' }}>Settings panel content</div> },
  { label: 'Reports', value: 'reports', content: <div style={{ padding: '1rem' }}>Reports and analytics data</div> },
]

export const Default: Story = {
  args: {
    tabs: sampleTabs,
  },
}

export const WithDefaultValue: Story = {
  args: {
    tabs: sampleTabs,
    defaultValue: 'settings',
  },
}

export const Vertical: Story = {
  args: {
    tabs: sampleTabs,
    orientation: 'vertical',
  },
}

export const ManyTabs: Story = {
  args: {
    tabs: [
      { label: 'Dashboard', value: 'dashboard', content: <div style={{ padding: '1rem' }}>Dashboard</div> },
      { label: 'Analytics', value: 'analytics', content: <div style={{ padding: '1rem' }}>Analytics</div> },
      { label: 'Users', value: 'users', content: <div style={{ padding: '1rem' }}>Users management</div> },
      { label: 'Billing', value: 'billing', content: <div style={{ padding: '1rem' }}>Billing information</div> },
      { label: 'Security', value: 'security', content: <div style={{ padding: '1rem' }}>Security settings</div> },
    ],
  },
}
