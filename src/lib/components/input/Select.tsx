import React from 'react';
import { Select as MantineSelect } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const SelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const SelectPropsSchema = z.object({
  label: z.string().optional(),
  placeholder: z.string().optional(),
  options: z.array(SelectOptionSchema),
  value: z.string().nullable().optional(),
  searchable: z.boolean().default(false),
  clearable: z.boolean().default(false),
  disabled: z.boolean().default(false),
  className: z.string().optional(),
  onChange: z.function().optional(),
  onAction: z.function().optional(),
  data: z.any().optional(),
});

type SelectProps = z.infer<typeof SelectPropsSchema>;

export const Select: React.FC<SelectProps & { id?: string }> = ({
  label,
  placeholder,
  options,
  value,
  searchable = false,
  clearable = false,
  disabled = false,
  className = '',
  onChange,
  onAction,
  data,
  id,
}) => (
  <MantineSelect
    id={id}
    label={data?.label ?? label}
    placeholder={data?.placeholder ?? placeholder}
    data={data?.options ?? options}
    value={data?.value ?? value}
    searchable={searchable}
    clearable={clearable}
    disabled={disabled}
    className={`w-full ${className}`}
    onChange={(val: string | null) => {
      onChange?.(val);
      onAction?.({ type: 'custom', trigger: 'change', payload: { value: val, id } as any });
    }}
  />
);

sduiRegistry.register('Select', {
  component: Select,
  schema: SelectPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'input',
    description: 'Dropdown select with search and clear support',
    tags: ['select', 'dropdown', 'input'],
  },
  defaultProps: { searchable: false, clearable: false },
});
