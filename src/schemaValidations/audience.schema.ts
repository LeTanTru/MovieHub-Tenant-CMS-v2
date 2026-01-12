import { z } from 'zod';

export const audienceSchema = z.object({});

export const audienceSearchSchema = z.object({
  fullName: z.string().optional().nullable(),
  kind: z.number().optional().nullable(),
  phone: z.string().optional().nullable(),
  status: z.number().optional().nullable()
});
