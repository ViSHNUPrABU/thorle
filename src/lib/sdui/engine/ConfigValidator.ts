import { z } from 'zod';

const SDUIVisibilityRuleSchema = z.object({
  contextKey: z.string(),
  op: z.enum(['eq', 'ne', 'in', 'gt', 'lt', 'contains', 'exists']),
  value: z.any(),
});

const SDUIDataSourceSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).optional(),
  url: z.string(),
  headers: z.record(z.string()).optional(),
  params: z.record(z.string()).optional(),
  body: z.any().optional(),
  polling: z.object({
    intervalMs: z.number().positive(),
    stopOnError: z.boolean().optional(),
  }).optional(),
  cacheTTL: z.number().nonnegative().optional(),
  transform: z.string().optional(),
});

const SDUIActionSchema = z.object({
  type: z.enum(['navigate', 'open-url', 'dispatch-event', 'custom']),
  trigger: z.enum(['click', 'hover', 'submit', 'change']),
  payload: z.record(z.any()),
});

const SDUIStyleSchema = z.object({
  className: z.string().optional(),
  variant: z.string().optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  color: z.string().optional(),
  custom: z.record(z.string()).optional(),
});

const SDUILayoutSchema = z.object({
  display: z.enum(['block', 'flex', 'grid', 'none']).optional(),
  flexDirection: z.enum(['row', 'column']).optional(),
  gap: z.string().optional(),
  padding: z.string().optional(),
  margin: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  minWidth: z.string().optional(),
  minHeight: z.string().optional(),
  maxWidth: z.string().optional(),
  maxHeight: z.string().optional(),
  flex: z.number().optional(),
  grow: z.number().optional(),
  shrink: z.number().optional(),
  basis: z.string().optional(),
  align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
  justify: z.enum(['start', 'center', 'end', 'between', 'around']).optional(),
  wrap: z.boolean().optional(),
  gridColumns: z.number().optional(),
  gridRows: z.number().optional(),
});

const SDUIComponentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.string(),
    version: z.string().optional(),
    props: z.record(z.any()).optional(),
    children: z.array(SDUIComponentSchema).optional(),
    actions: z.array(SDUIActionSchema).optional(),
    dataSource: SDUIDataSourceSchema.optional(),
    visibility: z.array(SDUIVisibilityRuleSchema).optional(),
    style: SDUIStyleSchema.optional(),
    layout: SDUILayoutSchema.optional(),
  })
);

export const SDUIConfigSchema = z.object({
  version: z.string(),
  screen: z.string(),
  metadata: z.object({
    theme: z.string().optional(),
    trackingId: z.string().optional(),
    lastUpdated: z.string().optional(),
    author: z.string().optional(),
  }).optional(),
  components: z.array(SDUIComponentSchema),
});

export function validateSDUIConfig(config: unknown): { valid: boolean; errors?: z.ZodError } {
  const result = SDUIConfigSchema.safeParse(config);
  return { valid: result.success, errors: result.success ? undefined : result.error };
}
