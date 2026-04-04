import React from 'react';
import { Notification } from '@mantine/core';
import { z } from 'zod';
import { sduiRegistry } from '../../sdui/registry/Registry';

const ToastPropsSchema = z.object({
  message: z.string(),
  title: z.string().optional(),
  color: z.enum(['blue', 'green', 'red', 'yellow', 'gray']).default('blue'),
  icon: z.string().optional(),
  withCloseButton: z.boolean().default(true),
  className: z.string().optional(),
  onClose: z.function().optional(),
  data: z.any().optional(),
});

type ToastProps = z.infer<typeof ToastPropsSchema>;

export const Toast: React.FC<ToastProps & { id?: string }> = ({
  message,
  title,
  color = 'blue',
  icon,
  withCloseButton = true,
  className = '',
  onClose,
  data,
  id,
}) => {
  const displayMessage = data?.message ?? message;
  const displayTitle = data?.title ?? title;

  return (
    <Notification
      id={id}
      title={displayTitle}
      color={color}
      icon={icon}
      withCloseButton={withCloseButton}
      onClose={onClose}
      className={`w-full ${className}`}
    >
      {displayMessage}
    </Notification>
  );
};

sduiRegistry.register('Toast', {
  component: Toast,
  schema: ToastPropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'feedback',
    description: 'Notification toast with auto-close support',
    tags: ['toast', 'notification', 'alert'],
  },
  defaultProps: { color: 'blue', withCloseButton: true },
});
