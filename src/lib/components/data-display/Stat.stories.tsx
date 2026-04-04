// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Stat } from './Stat'

const meta = {
  title: 'Data Display/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    icon: { control: 'text' },
    color: { control: 'text' },
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
    trendValue: { control: 'text' },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$45,231',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Active Users',
    value: '1,234',
    icon: '👥',
  },
}

export const TrendUp: Story = {
  args: {
    label: 'Revenue Growth',
    value: '12.5%',
    trend: 'up',
    trendValue: '+2.5% from last month',
  },
}

export const TrendDown: Story = {
  args: {
    label: 'Bounce Rate',
    value: '32.1%',
    trend: 'down',
    trendValue: '-5.2% from last month',
  },
}

export const TrendNeutral: Story = {
  args: {
    label: 'Server Uptime',
    value: '99.9%',
    trend: 'neutral',
    trendValue: 'No change',
  },
}

export const NumericValue: Story = {
  args: {
    label: 'Page Views',
    value: 89432,
    trend: 'up',
    trendValue: '+12.3%',
  },
}
