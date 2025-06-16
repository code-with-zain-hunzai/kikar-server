import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export type ContactInput = {
  fullName: string;
  email: string;
  phone?: string;
  destination: string;
  travelType: string;
  message: string;
};
