// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { ErrorDisplay } from './Error'

const meta = {
  title: 'Common/Error',
  component: ErrorDisplay,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof ErrorDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithMessage: Story = {
  args: {
    message: 'Failed to load data',
  },
}

export const WithErrorObject: Story = {
  args: {
    error: new Error('Network timeout after 30s'),
  },
}

export const WithErrorString: Story = {
  args: {
    error: 'Connection refused',
  },
}

export const WithRetry: Story = {
  args: {
    message: 'Failed to fetch resources',
    onRetry: () => alert('Retrying...'),
  },
}

export const FullError: Story = {
  args: {
    error: new Error('Internal Server Error: Unable to process request'),
    message: 'Something went wrong',
    onRetry: () => alert('Retrying...'),
  },
}
