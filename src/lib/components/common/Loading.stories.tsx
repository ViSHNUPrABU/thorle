// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { Loading } from './Loading'

const meta = {
  title: 'Common/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomMessage: Story = {
  args: {
    message: 'Fetching data...',
  },
}

export const LongMessage: Story = {
  args: {
    message: 'Please wait while we process your request...',
  },
}
