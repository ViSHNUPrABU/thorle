import React from 'react';
import { Badge as MantineBadge } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const BadgePropsSchema = z.object({
  label: z.string(),
  color: z.string().default('blue'),
  variant: z.enum(['light', 'filled', 'outline', 'dot']).default('light'),
  size: z.enum(['xs', 'sm', 'md', 'lg']).default('sm'),
  radius: z.union([z.string(), z.number()]).default('xl'),
  className: z.string().optional(),
  data: z.any().optional(),
});

type BadgeProps = z.infer<typeof BadgePropsSchema>;

export const Badge: React.FC<BadgeProps & { id?: string }> = ({
  label,
  color = 'blue',
  variant = 'light',
  size = 'sm',
  radius = 'xl',
  className = '',
  data,
  id,
}) => {
  const displayLabel = data?.label ?? label;
  return (
    <MantineBadge
      id={id}
      color={color}
      variant={variant}
      size={size}
      radius={radius}
      className={className}
    >
      {displayLabel}
    </MantineBadge>
  );
};

sduiRegistry.register('Badge', {
  component: Badge,
  schema: BadgePropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'data-display',
    description: 'Status and label badges with multiple variants',
    tags: ['badge', 'status', 'label'],
  },
  defaultProps: { color: 'blue', variant: 'light', size: 'sm', radius: 'xl' },
});
