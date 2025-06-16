import { z } from 'zod';

export const CreateDestinationSchema = z.object({
  name: z.string().min(2).max(100),
  location: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  image: z.string().url().optional(),
  highlights: z.array(z.string().min(3).max(100)).max(10).optional(),
  type: z.enum(['valley', 'peak', 'lake', 'glacier', 'cultural']),
  rating: z.number().min(0).max(5).optional(),
});

export type CreateDestinationData = z.infer<typeof CreateDestinationSchema>;

export const UpdateDestinationSchema = CreateDestinationSchema.partial();
export type UpdateDestinationData = z.infer<typeof UpdateDestinationSchema>;