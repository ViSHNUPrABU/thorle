import React from 'react';
import { Breadcrumbs as MantineBreadcrumbs, Anchor, Text } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const BreadcrumbItemSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
});

const BreadcrumbPropsSchema = z.object({
  items: z.array(BreadcrumbItemSchema),
  separator: z.string().optional(),
  className: z.string().optional(),
  data: z.any().optional(),
});

type BreadcrumbProps = z.infer<typeof BreadcrumbPropsSchema>;

export const Breadcrumb: React.FC<BreadcrumbProps & { id?: string }> = ({
  items,
  separator,
  className = '',
  data,
  id,
}) => {
  const displayItems = data?.items ?? items;

  const elements = displayItems.map((item: any, index: number) => {
    if (item.href) {
      return (
        <Anchor key={index} href={item.href} size="sm">
          {item.label}
        </Anchor>
      );
    }
    return (
      <Text key={index} size="sm" color="dimmed">
        {item.label}
      </Text>
    );
  });

  return (
    <MantineBreadcrumbs separator={separator} className={`py-2 ${className}`} id={id}>
      {elements}
    </MantineBreadcrumbs>
  );
};

sduiRegistry.register('Breadcrumb', {
  component: Breadcrumb,
  schema: BreadcrumbPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'navigation',
    description: 'Breadcrumb navigation trail',
    tags: ['breadcrumb', 'navigation', 'trail'],
  },
});
