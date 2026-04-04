import React from 'react'
import { Card, Text, Group } from '@mantine/core'
import { z } from 'zod'
import { sduiRegistry } from '../../sdui/registry/Registry'

const StatPropsSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  icon: z.string().optional(),
  color: z.string().default('blue'),
  trend: z.enum(['up', 'down', 'neutral']).optional(),
  trendValue: z.union([z.string(), z.number()]).optional(),
  className: z.string().optional(),
  data: z.unknown().optional(),
})

export type StatProps = z.infer<typeof StatPropsSchema>

export const Stat: React.FC<StatProps & { id?: string }> = ({
  label,
  value,
  icon,
  color: _color,
  trend,
  trendValue,
  className = '',
  data,
  id,
}) => {
  const displayValue = data?.value ?? value
  const displayLabel = data?.label ?? label
  const displayTrend = data?.trend ?? trend
  const displayTrendValue = data?.trendValue ?? trendValue

  const trendColor = displayTrend === 'up' ? 'green' : displayTrend === 'down' ? 'red' : 'gray'
  const trendIcon = displayTrend === 'up' ? '\u2191' : displayTrend === 'down' ? '\u2193' : '\u2192'

  return (
    <Card id={id} shadow="sm" p="lg" radius="md" withBorder className={`w-full ${className}`}>
      <Group justify="space-between" mb="xs">
        <Text size="sm" c="dimmed">{displayLabel}</Text>
        {icon && <span>{icon}</span>}
      </Group>
      <Text size="xl" fw={700} mb="xs">{String(displayValue)}</Text>
      {displayTrend && displayTrendValue && (
        <Text size="xs" c={trendColor}>
          {trendIcon} {displayTrendValue}
        </Text>
      )}
    </Card>
  )
}

sduiRegistry.register('Stat', {
  component: Stat,
  schema: StatPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'data-display',
    description: 'Single KPI stat card with optional trend indicator',
    tags: ['stat', 'kpi', 'metric'],
  },
  defaultProps: { color: 'blue' },
})
