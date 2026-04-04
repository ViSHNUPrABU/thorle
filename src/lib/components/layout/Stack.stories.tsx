// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Stack } from './Stack'

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    spacing: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around'] },
    grow: { control: 'boolean' },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const box = (text: string, color: string) => (
  <div style={{ background: color, padding: '1rem', borderRadius: '4px', color: '#fff', fontWeight: 600 }}>
    {text}
  </div>
)

export const Column: Story = {
  args: {
    direction: 'column',
    spacing: 'md',
    children: (
      <>
        {box('Item 1', '#3498db')}
        {box('Item 2', '#2ecc71')}
        {box('Item 3', '#e74c3c')}
      </>
    ),
  },
}

export const Row: Story = {
  args: {
    direction: 'row',
    spacing: 'md',
    children: (
      <>
        {box('Item 1', '#3498db')}
        {box('Item 2', '#2ecc71')}
        {box('Item 3', '#e74c3c')}
      </>
    ),
  },
}

export const Centered: Story = {
  args: {
    direction: 'column',
    spacing: 'lg',
    align: 'center',
    justify: 'center',
    children: (
      <>
        {box('Centered 1', '#9b59b6')}
        {box('Centered 2', '#3498db')}
      </>
    ),
  },
}

export const SpacedBetween: Story = {
  args: {
    direction: 'row',
    spacing: 'md',
    justify: 'between',
    children: (
      <>
        {box('Left', '#e67e22')}
        {box('Center', '#1abc9c')}
        {box('Right', '#e74c3c')}
      </>
    ),
  },
}

export const Grow: Story = {
  args: {
    direction: 'row',
    spacing: 'md',
    grow: true,
    children: (
      <>
        {box('Grow 1', '#3498db')}
        {box('Grow 2', '#2ecc71')}
        {box('Grow 3', '#e74c3c')}
      </>
    ),
  },
}
