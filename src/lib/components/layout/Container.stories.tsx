// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Container } from './Container'

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'fluid'] },
    px: { control: 'text' },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'lg',
    children: <div style={{ background: '#f0f0f0', padding: '2rem', textAlign: 'center' }}>Container Content</div>,
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: <div style={{ background: '#e8f4fd', padding: '2rem', textAlign: 'center' }}>Small Container</div>,
  },
}

export const Fluid: Story = {
  args: {
    size: 'fluid',
    children: <div style={{ background: '#fef9e7', padding: '2rem', textAlign: 'center' }}>Fluid Container (full width)</div>,
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: <div style={{ background: '#f4ecf7', padding: '2rem', textAlign: 'center' }}>Extra Large Container</div>,
  },
}

export const WithPadding: Story = {
  args: {
    size: 'md',
    px: 'xl',
    children: <div style={{ background: '#eafaf1', padding: '2rem', textAlign: 'center' }}>Container with extra horizontal padding</div>,
  },
}
