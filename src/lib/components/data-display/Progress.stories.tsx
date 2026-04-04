// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Progress } from './Progress'

const meta = {
  title: 'Data Display/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    label: { control: 'text' },
    color: { control: 'text' },
    size: { control: 'text' },
    showLabel: { control: 'boolean' },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 60,
  },
}

export const WithLabel: Story = {
  args: {
    value: 75,
    label: 'Storage Used',
  },
}

export const LowProgress: Story = {
  args: {
    value: 15,
    label: 'Completion',
    color: 'red',
  },
}

export const Complete: Story = {
  args: {
    value: 100,
    label: 'Upload Complete',
    color: 'green',
  },
}

export const NoLabel: Story = {
  args: {
    value: 45,
    showLabel: false,
    color: 'violet',
  },
}

export const Large: Story = {
  args: {
    value: 80,
    label: 'Disk Usage',
    size: 'lg',
    color: 'orange',
  },
}

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <Progress value={90} label="CPU" color="red" />
      <Progress value={65} label="Memory" color="yellow" />
      <Progress value={40} label="Disk" color="green" />
      <Progress value={25} label="Network" color="blue" />
    </div>
  ),
}
