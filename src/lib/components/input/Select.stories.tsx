// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { Select } from './Select'

const meta = {
  title: 'Input/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    searchable: { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [(story) => <MantineProvider>{story()}</MantineProvider>],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
]

export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Select a country',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Choose your country',
  },
}

export const Searchable: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Search countries...',
    searchable: true,
  },
}

export const Clearable: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    clearable: true,
  },
}

export const SearchableAndClearable: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Search and select...',
    searchable: true,
    clearable: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'us',
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'uk',
    placeholder: 'Select a country',
  },
}
