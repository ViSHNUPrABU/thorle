// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Badge } from './Badge'

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    color: { control: 'text' },
    variant: { control: 'select', options: ['light', 'filled', 'outline', 'dot'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    radius: { control: 'text' },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Badge',
  },
}

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge label="Active" color="green" />
      <Badge label="Pending" color="yellow" />
      <Badge label="Inactive" color="gray" />
      <Badge label="Error" color="red" />
      <Badge label="Info" color="blue" />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge label="Light" variant="light" />
      <Badge label="Filled" variant="filled" />
      <Badge label="Outline" variant="outline" />
      <Badge label="Dot" variant="dot" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge label="XS" size="xs" />
      <Badge label="SM" size="sm" />
      <Badge label="MD" size="md" />
      <Badge label="LG" size="lg" />
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge label="Blue" color="blue" />
      <Badge label="Red" color="red" />
      <Badge label="Green" color="green" />
      <Badge label="Orange" color="orange" />
      <Badge label="Violet" color="violet" />
      <Badge label="Teal" color="teal" />
    </div>
  ),
}
