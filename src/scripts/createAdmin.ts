import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = 'admin@example.com'; // Change this to your desired email
    const password = 'admin123'; // Change this to your desired password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        role: 'admin'
      }
    });

    console.log('Admin created successfully:', admin);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin(); 