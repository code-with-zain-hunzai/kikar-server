import { z } from 'zod';

export const destinationTypeEnum = z.enum(['valley', 'peak', 'lake', 'glacier', 'cultural']);

export const createDestinationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  type: destinationTypeEnum,
  rating: z.number().min(0).max(5).default(0)
});

export const updateDestinationSchema = createDestinationSchema.partial();

export type CreateDestinationInput = z.infer<typeof createDestinationSchema>;
export type UpdateDestinationInput = z.infer<typeof updateDestinationSchema>; 