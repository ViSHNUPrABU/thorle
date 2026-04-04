import React from 'react';
import { Stack as MantineStack, Group } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const StackPropsSchema = z.object({
  direction: z.enum(['row', 'column']).default('column'),
  spacing: z.union([z.string(), z.number()]).default('md'),
  align: z.enum(['start', 'center', 'end', 'stretch']).default('stretch'),
  justify: z.enum(['start', 'center', 'end', 'between', 'around']).default('start'),
  grow: z.boolean().default(false),
  className: z.string().optional(),
  children: z.any().optional(),
});

type StackProps = z.infer<typeof StackPropsSchema>;

export const Stack: React.FC<StackProps & { id?: string }> = ({
  direction = 'column',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  grow = false,
  children,
  className = '',
  id,
}) => {
  const Component = direction === 'row' ? Group : MantineStack;

  return (
    <Component
      id={id}
      spacing={spacing}
      align={align}
      justify={justify}
      grow={grow}
      className={`w-full ${className}`}
    >
      {children}
    </Component>
  );
};

sduiRegistry.register('Stack', {
  component: Stack,
  schema: StackPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'layout',
    description: 'Flexible flexbox container for row or column layouts',
    tags: ['flex', 'container', 'layout'],
  },
  defaultProps: {
    direction: 'column',
    spacing: 'md',
    align: 'stretch',
    justify: 'start',
  },
});
