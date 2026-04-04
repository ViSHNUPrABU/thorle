// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Grid } from './Grid'

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    cols: { control: { type: 'range', min: 1, max: 12, step: 1 } },
    spacing: { control: 'text' },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const box = (text: string, color: string) => (
  <div style={{ background: color, padding: '2rem', borderRadius: '4px', color: '#fff', fontWeight: 600, textAlign: 'center' }}>
    {text}
  </div>
)

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    spacing: 'md',
    children: (
      <>
        {box('1', '#3498db')}
        {box('2', '#2ecc71')}
        {box('3', '#e74c3c')}
        {box('4', '#9b59b6')}
        {box('5', '#e67e22')}
        {box('6', '#1abc9c')}
      </>
    ),
  },
}

export const TwoColumns: Story = {
  args: {
    cols: 2,
    spacing: 'lg',
    children: (
      <>
        {box('Item A', '#3498db')}
        {box('Item B', '#2ecc71')}
        {box('Item C', '#e74c3c')}
        {box('Item D', '#9b59b6')}
      </>
    ),
  },
}

export const FourColumns: Story = {
  args: {
    cols: 4,
    spacing: 'sm',
    children: (
      <>
        {box('1', '#3498db')}
        {box('2', '#2ecc71')}
        {box('3', '#e74c3c')}
        {box('4', '#9b59b6')}
        {box('5', '#e67e22')}
        {box('6', '#1abc9c')}
        {box('7', '#f39c12')}
        {box('8', '#d35400')}
      </>
    ),
  },
}

export const SingleColumn: Story = {
  args: {
    cols: 1,
    spacing: 'md',
    children: (
      <>
        {box('Full Width 1', '#3498db')}
        {box('Full Width 2', '#2ecc71')}
        {box('Full Width 3', '#e74c3c')}
      </>
    ),
  },
}

export const WithBreakpoints: Story = {
  args: {
    cols: 4,
    spacing: 'md',
    breakpoints: [
      { maxWidth: 900, cols: 2, spacing: 'sm' },
      { maxWidth: 600, cols: 1, spacing: 'xs' },
    ],
    children: (
      <>
        {box('1', '#3498db')}
        {box('2', '#2ecc71')}
        {box('3', '#e74c3c')}
        {box('4', '#9b59b6')}
      </>
    ),
  },
}
