import React from 'react';
import { Progress as MantineProgress, Text } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const ProgressPropsSchema = z.object({
  value: z.number().min(0).max(100),
  label: z.string().optional(),
  color: z.string().default('blue'),
  size: z.union([z.string(), z.number()]).default('md'),
  showLabel: z.boolean().default(true),
  className: z.string().optional(),
  data: z.any().optional(),
});

type ProgressProps = z.infer<typeof ProgressPropsSchema>;

export const Progress: React.FC<ProgressProps & { id?: string }> = ({
  value,
  label,
  color = 'blue',
  size = 'md',
  showLabel = true,
  className = '',
  data,
  id,
}) => {
  const displayValue = data?.value ?? value;
  const displayLabel = data?.label ?? label;

  return (
    <div className={`w-full ${className}`}>
      {(displayLabel || showLabel) && (
        <div className="flex justify-between mb-1">
          {displayLabel && <Text size="sm">{displayLabel}</Text>}
          {showLabel && <Text size="sm" color="dimmed">{displayValue}%</Text>}
        </div>
      )}
      <MantineProgress id={id} value={displayValue} color={color} size={size} />
    </div>
  );
};

sduiRegistry.register('Progress', {
  component: Progress,
  schema: ProgressPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'data-display',
    description: 'Progress bar with optional label and percentage display',
    tags: ['progress', 'bar', 'percentage'],
  },
  defaultProps: { color: 'blue', size: 'md', showLabel: true },
});
