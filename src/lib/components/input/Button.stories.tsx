// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Button } from './Button'

const meta = {
  title: 'Input/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['filled', 'light', 'outline', 'subtle', 'white'] },
    color: { control: 'text' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'text' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    leftIcon: { control: 'text' },
    rightIcon: { control: 'text' },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Click Me',
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button label="Filled" variant="filled" />
      <Button label="Light" variant="light" />
      <Button label="Outline" variant="outline" />
      <Button label="Subtle" variant="subtle" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Button label="XS" size="xs" />
      <Button label="SM" size="sm" />
      <Button label="MD" size="md" />
      <Button label="LG" size="lg" />
      <Button label="XL" size="xl" />
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button label="Blue" color="blue" />
      <Button label="Red" color="red" />
      <Button label="Green" color="green" />
      <Button label="Orange" color="orange" />
      <Button label="Violet" color="violet" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    label: 'Loading',
    loading: true,
  },
}

export const WithIcons: Story = {
  args: {
    label: 'Submit',
    leftIcon: '📤',
    rightIcon: '→',
  },
}

export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
    fullWidth: true,
  },
}
