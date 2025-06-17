import { z } from 'zod';

export const difficultyEnum = z.enum(['Easy', 'Moderate', 'Challenging', 'Difficult']);

export const createTravelPackageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  originalPrice: z.number().min(0).optional(),
  discount: z.number().min(0).max(100).optional(),
  durationDays: z.number().min(1, 'Duration must be at least 1 day'),
  location: z.string().min(1, 'Location is required'),
  destinationId: z.string().uuid('Invalid destination ID'),
  images: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).default(0),
  featured: z.boolean().default(false),
  groupSize: z.string().min(1, 'Group size is required'),
  bestTime: z.string().min(1, 'Best time is required'),
  difficulty: difficultyEnum
});

export const updateTravelPackageSchema = createTravelPackageSchema.partial();

export type CreateTravelPackageInput = z.infer<typeof createTravelPackageSchema>;
export type UpdateTravelPackageInput = z.infer<typeof updateTravelPackageSchema>; 