import React from 'react';
import { Button as MantineButton } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const ButtonPropsSchema = z.object({
  label: z.string(),
  variant: z.enum(['filled', 'light', 'outline', 'subtle', 'white']).default('filled'),
  color: z.string().default('blue'),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).default('sm'),
  radius: z.union([z.string(), z.number()]).default('sm'),
  fullWidth: z.boolean().default(false),
  disabled: z.boolean().default(false),
  loading: z.boolean().default(false),
  leftIcon: z.string().optional(),
  rightIcon: z.string().optional(),
  className: z.string().optional(),
  onClick: z.function().optional(),
  onAction: z.function().optional(),
  data: z.any().optional(),
});

type ButtonProps = z.infer<typeof ButtonPropsSchema>;

export const Button: React.FC<ButtonProps & { id?: string }> = ({
  label,
  variant = 'filled',
  color = 'blue',
  size = 'sm',
  radius = 'sm',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  onAction,
  data,
  id,
}) => {
  const displayLabel = data?.label ?? label;

  const handleClick = () => {
    onClick?.();
    onAction?.({ type: 'custom', trigger: 'click', payload: { action: 'button-click', id } });
  };

  return (
    <MantineButton
      id={id}
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      fullWidth={fullWidth}
      disabled={disabled}
      loading={loading}
      className={className}
      onClick={handleClick}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {displayLabel}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </MantineButton>
  );
};

sduiRegistry.register('Button', {
  component: Button,
  schema: ButtonPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'input',
    description: 'Action button with multiple variants and states',
    tags: ['button', 'action', 'input'],
  },
  defaultProps: { variant: 'filled', color: 'blue', size: 'sm', radius: 'sm' },
});
