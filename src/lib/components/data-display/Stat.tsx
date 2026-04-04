import React from 'react';
import { Card, Text, Group } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const StatPropsSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  icon: z.string().optional(),
  color: z.string().default('blue'),
  trend: z.enum(['up', 'down', 'neutral']).optional(),
  trendValue: z.union([z.string(), z.number()]).optional(),
  className: z.string().optional(),
  data: z.any().optional(),
});

type StatProps = z.infer<typeof StatPropsSchema>;

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
  const displayValue = data?.value ?? value;
  const displayLabel = data?.label ?? label;
  const displayTrend = data?.trend ?? trend;
  const displayTrendValue = data?.trendValue ?? trendValue;

  const trendColor = displayTrend === 'up' ? 'green' : displayTrend === 'down' ? 'red' : 'gray';
  const trendIcon = displayTrend === 'up' ? '↑' : displayTrend === 'down' ? '↓' : '→';

  void _color;
  return (
    <Card id={id} shadow="sm" p="lg" radius="md" withBorder className={`w-full ${className}`}>
      <Group position="apart" mb="xs">
        <Text size="sm" color="dimmed">{displayLabel}</Text>
        {icon && <span>{icon}</span>}
      </Group>
      <Text size="xl" weight={700} mb="xs">{String(displayValue)}</Text>
      {displayTrend && displayTrendValue && (
        <Text size="xs" color={trendColor}>
          {trendIcon} {displayTrendValue}
        </Text>
      )}
    </Card>
  );
};

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
});
