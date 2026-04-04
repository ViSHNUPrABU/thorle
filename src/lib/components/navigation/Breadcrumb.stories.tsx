// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text' },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

const defaultItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Settings', href: '/dashboard/settings' },
  { label: 'Profile' },
]

export const Default: Story = {
  args: {
    items: defaultItems,
  },
}

export const Short: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products' },
    ],
  },
}

export const Long: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Admin', href: '/admin' },
      { label: 'Users', href: '/admin/users' },
      { label: 'Details', href: '/admin/users/123' },
      { label: 'Edit Profile' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    items: defaultItems,
    separator: '>',
  },
}

export const AllLinks: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings', href: '/dashboard/settings' },
    ],
  },
}

export const SingleItem: Story = {
  args: {
    items: [
      { label: 'Current Page' },
    ],
  },
}
