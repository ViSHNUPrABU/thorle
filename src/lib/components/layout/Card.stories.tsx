// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Card } from './Card'

const meta = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    shadow: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
    padding: { control: 'text' },
    radius: { control: 'text' },
    withBorder: { control: 'boolean' },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div>Card content goes here</div>,
  },
}

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: <div>Card content with a title section</div>,
  },
}

export const WithTitleAndSubtitle: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'This is a subtitle with additional context',
    children: <div>Card content with title and subtitle</div>,
  },
}

export const LargeShadow: Story = {
  args: {
    title: 'Elevated Card',
    shadow: 'lg',
    children: <div>Card with large shadow</div>,
  },
}

export const NoBorder: Story = {
  args: {
    title: 'Borderless Card',
    withBorder: false,
    shadow: 'none',
    children: <div>Card without border</div>,
  },
}

export const Compact: Story = {
  args: {
    title: 'Compact Card',
    padding: 'sm',
    radius: 'sm',
    children: <div>Card with compact padding</div>,
  },
}
