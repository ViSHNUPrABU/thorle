// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Toast } from './Toast'

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    title: { control: 'text' },
    color: { control: 'select', options: ['blue', 'green', 'red', 'yellow', 'gray'] },
    icon: { control: 'text' },
    withCloseButton: { control: 'boolean' },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: 'This is a notification message',
  },
}

export const WithTitle: Story = {
  args: {
    title: 'Success',
    message: 'Your changes have been saved successfully',
    color: 'green',
  },
}

export const Error: Story = {
  args: {
    title: 'Error',
    message: 'Failed to save changes. Please try again.',
    color: 'red',
  },
}

export const Warning: Story = {
  args: {
    title: 'Warning',
    message: 'Your session will expire in 5 minutes',
    color: 'yellow',
  },
}

export const Info: Story = {
  args: {
    title: 'Information',
    message: 'A new version is available. Refresh to update.',
    color: 'blue',
  },
}

export const NoCloseButton: Story = {
  args: {
    title: 'Processing',
    message: 'Your request is being processed. Please wait...',
    color: 'gray',
    withCloseButton: false,
  },
}

export const WithIcon: Story = {
  args: {
    title: 'Custom Icon',
    message: 'Toast with a custom icon',
    color: 'blue',
    icon: '🔔',
  },
}
