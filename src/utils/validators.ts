import { z } from 'zod';

export const activitySchema = z.object({
  type: z.enum(['water', 'steps', 'sleep']),
  value: z.string()
    .min(1, 'Value is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Must be a positive number'
    }),
  notes: z.string().max(200, 'Notes must be under 200 characters').optional()
}).refine((data) => {
  const numValue = Number(data.value);
  if (data.type === 'sleep' && numValue > 24) return false;
  if (data.type === 'water' && numValue > 50) return false;
  return true;
}, {
  message: 'Invalid value for selected activity type',
  path: ['value']
});

export type ActivityFormData = z.infer<typeof activitySchema>;
