// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { Empty } from './Empty'

const meta = {
  title: 'Common/Empty',
  component: Empty,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomMessage: Story = {
  args: {
    message: 'No Results Found',
  },
}

export const WithDescription: Story = {
  args: {
    message: 'No Results Found',
    description: 'Try adjusting your search or filter criteria',
  },
}

export const EmptyTable: Story = {
  args: {
    message: 'No Records',
    description: 'This table is empty. Add a record to get started.',
  },
}
