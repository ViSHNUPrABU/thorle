// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react'
import { validateSDUIConfig } from './ConfigValidator'

const meta = {
  title: 'SDUI/ConfigValidator',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const validConfig = {
  version: '1.0.0',
  screen: 'dashboard',
  metadata: {
    theme: 'light',
    author: 'admin',
  },
  components: [
    {
      id: 'header-1',
      type: 'Text',
      props: { content: 'Welcome' },
    },
    {
      id: 'btn-1',
      type: 'Button',
      props: { label: 'Click Me' },
      actions: [
        {
          type: 'navigate',
          trigger: 'click',
          payload: { url: '/next' },
        },
      ],
    },
  ],
}

const invalidConfig = {
  version: '1.0.0',
  components: 'not-an-array',
}

const configWithNestedChildren = {
  version: '2.0.0',
  screen: 'settings',
  metadata: {
    theme: 'dark',
    trackingId: 'track-123',
    lastUpdated: '2026-01-15',
    author: 'dev-team',
  },
  components: [
    {
      id: 'container-1',
      type: 'Container',
      props: { size: 'lg' },
      children: [
        {
          id: 'card-1',
          type: 'Card',
          props: { title: 'Settings Card' },
          children: [
            {
              id: 'text-1',
              type: 'Text',
              props: { content: 'Configure your preferences' },
            },
          ],
        },
      ],
    },
  ],
}

const configWithDataSource = {
  version: '1.0.0',
  screen: 'analytics',
  components: [
    {
      id: 'chart-1',
      type: 'Chart',
      dataSource: {
        method: 'GET',
        url: '/api/analytics',
        headers: { Authorization: 'Bearer token' },
        polling: {
          intervalMs: 5000,
          stopOnError: true,
        },
        cacheTTL: 60000,
      },
    },
  ],
}

const configWithVisibilityRules = {
  version: '1.0.0',
  screen: 'admin',
  components: [
    {
      id: 'admin-panel',
      type: 'Panel',
      visibility: [
        { contextKey: 'role', op: 'eq', value: 'admin' },
        { contextKey: 'permissions', op: 'contains', value: 'manage' },
      ],
    },
    {
      id: 'public-section',
      type: 'Section',
      visibility: [
        { contextKey: 'isLoggedIn', op: 'exists', value: true },
      ],
    },
  ],
}

export const ValidConfig: Story = {
  render: () => {
    const result = validateSDUIConfig(validConfig)
    return (
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Valid Config Result</h3>
        <pre style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '4px', fontSize: '0.875rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    )
  },
}

export const InvalidConfig: Story = {
  render: () => {
    const result = validateSDUIConfig(invalidConfig)
    return (
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Invalid Config Result</h3>
        <pre style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '4px', fontSize: '0.875rem' }}>
          {JSON.stringify({ valid: result.valid, errorCount: result.errors?.errors?.length || 0 }, null, 2)}
        </pre>
      </div>
    )
  },
}

export const NestedChildren: Story = {
  render: () => {
    const result = validateSDUIConfig(configWithNestedChildren)
    return (
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Nested Children Config</h3>
        <pre style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '4px', fontSize: '0.875rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    )
  },
}

export const WithDataSource: Story = {
  render: () => {
    const result = validateSDUIConfig(configWithDataSource)
    return (
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Config with DataSource</h3>
        <pre style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '4px', fontSize: '0.875rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    )
  },
}

export const WithVisibilityRules: Story = {
  render: () => {
    const result = validateSDUIConfig(configWithVisibilityRules)
    return (
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Config with Visibility Rules</h3>
        <pre style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '4px', fontSize: '0.875rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    )
  },
}

export const ValidationDemo: Story = {
  render: () => {
    const validResult = validateSDUIConfig(validConfig)
    const invalidResult = validateSDUIConfig(invalidConfig)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Valid Config</h3>
          <pre style={{ background: '#eafaf1', padding: '1rem', borderRadius: '4px', fontSize: '0.875rem' }}>
            {JSON.stringify(validResult, null, 2)}
          </pre>
        </div>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Invalid Config</h3>
          <pre style={{ background: '#fdecea', padding: '1rem', borderRadius: '4px', fontSize: '0.875rem' }}>
            {JSON.stringify({ valid: invalidResult.valid, errorCount: invalidResult.errors?.errors?.length || 0 }, null, 2)}
          </pre>
        </div>
      </div>
    )
  },
}
