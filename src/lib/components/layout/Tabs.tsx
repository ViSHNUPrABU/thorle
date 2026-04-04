import React, { useState } from 'react';
import { Tabs as MantineTabs } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const TabItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  content: z.any().optional(),
});

const TabsPropsSchema = z.object({
  tabs: z.array(TabItemSchema),
  defaultValue: z.string().optional(),
  orientation: z.enum(['horizontal', 'vertical']).default('horizontal'),
  className: z.string().optional(),
  children: z.any().optional(),
});

type TabItem = z.infer<typeof TabItemSchema>;
type TabsProps = z.infer<typeof TabsPropsSchema>;

export const Tabs: React.FC<TabsProps & { id?: string }> = ({
  tabs,
  defaultValue,
  orientation = 'horizontal',
  className = '',
  children,
  id,
}) => {
  const [active, setActive] = useState<string | null>(defaultValue || tabs[0]?.value || null);

  return (
    <MantineTabs
      id={id}
      value={active}
      onTabChange={setActive}
      orientation={orientation}
      className={`w-full ${className}`}
    >
      <MantineTabs.List>
        {tabs.map((tab: TabItem) => (
          <MantineTabs.Tab key={tab.value} value={tab.value}>
            {tab.label}
          </MantineTabs.Tab>
        ))}
      </MantineTabs.List>
      {tabs.map((tab: TabItem) => (
        <MantineTabs.Panel key={tab.value} value={tab.value}>
          {tab.content || children}
        </MantineTabs.Panel>
      ))}
    </MantineTabs>
  );
};

sduiRegistry.register('Tabs', {
  component: Tabs,
  schema: TabsPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'layout',
    description: 'Tabbed interface with configurable tab items',
    tags: ['tabs', 'navigation', 'layout'],
  },
  defaultProps: { orientation: 'horizontal' },
});
