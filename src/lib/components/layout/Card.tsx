import React from 'react';
import { Card as MantineCard, Title, Text } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const CardPropsSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  shadow: z.enum(['none', 'xs', 'sm', 'md', 'lg', 'xl']).default('sm'),
  padding: z.union([z.string(), z.number()]).default('lg'),
  radius: z.union([z.string(), z.number()]).default('md'),
  withBorder: z.boolean().default(true),
  className: z.string().optional(),
  children: z.any().optional(),
});

type CardProps = z.infer<typeof CardPropsSchema>;

export const Card: React.FC<CardProps & { id?: string }> = ({
  title,
  subtitle,
  shadow = 'sm',
  padding = 'lg',
  radius = 'md',
  withBorder = true,
  children,
  className = '',
  id,
}) => (
  <MantineCard
    id={id}
    shadow={shadow}
    p={padding}
    radius={radius}
    withBorder={withBorder}
    className={`w-full ${className}`}
  >
    {(title || subtitle) && (
      <MantineCard.Section mb="sm">
        {title && <Title order={4}>{title}</Title>}
        {subtitle && <Text size="sm" color="dimmed">{subtitle}</Text>}
      </MantineCard.Section>
    )}
    {children}
  </MantineCard>
);

sduiRegistry.register('Card', {
  component: Card,
  schema: CardPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'layout',
    description: 'Card wrapper with optional title and subtitle sections',
    tags: ['card', 'container', 'section'],
  },
  defaultProps: {
    shadow: 'sm',
    padding: 'lg',
    radius: 'md',
    withBorder: true,
  },
});
