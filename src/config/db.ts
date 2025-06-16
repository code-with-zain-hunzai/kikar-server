import { PrismaClient } from '@prisma/client';
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

export { prisma, connectDB };
