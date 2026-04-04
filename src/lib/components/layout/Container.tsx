import React from 'react';
import { Container as MantineContainer } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const ContainerPropsSchema = z.object({
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl', 'fluid']).default('lg'),
  px: z.union([z.string(), z.number()]).optional(),
  className: z.string().optional(),
  children: z.any().optional(),
});

type ContainerProps = z.infer<typeof ContainerPropsSchema>;

export const Container: React.FC<ContainerProps & { id?: string }> = ({
  size = 'lg',
  px,
  children,
  className = '',
  id,
}) => (
  <MantineContainer id={id} size={size} px={px} className={`w-full ${className}`}>
    {children}
  </MantineContainer>
);

sduiRegistry.register('Container', {
  component: Container,
  schema: ContainerPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'layout',
    description: 'Responsive page container with max-width constraints',
    tags: ['container', 'responsive', 'layout'],
  },
  defaultProps: { size: 'lg' },
});
