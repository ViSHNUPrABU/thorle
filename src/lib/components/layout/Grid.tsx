import React from 'react';
import { SimpleGrid } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const GridPropsSchema = z.object({
  cols: z.number().min(1).max(12).default(3),
  spacing: z.union([z.string(), z.number()]).default('md'),
  breakpoints: z.array(z.object({
    maxWidth: z.number(),
    cols: z.number(),
    spacing: z.union([z.string(), z.number()]).optional(),
  })).optional(),
  className: z.string().optional(),
  children: z.any().optional(),
});

type GridProps = z.infer<typeof GridPropsSchema>;

export const Grid: React.FC<GridProps & { id?: string }> = ({
  cols = 3,
  spacing = 'md',
  breakpoints,
  children,
  className = '',
  id,
}) => (
  <SimpleGrid
    id={id}
    cols={cols}
    spacing={spacing}
    breakpoints={breakpoints}
    className={`w-full ${className}`}
  >
    {children}
  </SimpleGrid>
);

sduiRegistry.register('Grid', {
  component: Grid,
  schema: GridPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'layout',
    description: 'Responsive CSS grid layout with breakpoint support',
    tags: ['grid', 'responsive', 'layout'],
  },
  defaultProps: { cols: 3, spacing: 'md' },
});
