import { z } from 'zod';
import { Difficulty } from '@prisma/client';

export const CreateTravelPackageSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  discount: z.number().min(0).max(100).optional(),
  difficulty: z.nativeEnum(Difficulty),
  durationDays: z.number().positive(),
  location: z.string().min(1),
  destination: z.string().uuid(),
  images: z.array(z.string().url()).max(5).optional(),
  rating: z.number().min(0).max(5).optional(),
  featured: z.boolean().optional(),
  groupSize: z.string().min(1),
  bestTime: z.string().min(1),
});

export type CreateTravelPackageData = z.infer<typeof CreateTravelPackageSchema>;

export const UpdateTravelPackageSchema = CreateTravelPackageSchema.partial();
export type UpdateTravelPackageData = z.infer<typeof UpdateTravelPackageSchema>;