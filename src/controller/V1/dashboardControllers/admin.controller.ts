// src/controllers/admin.controller.ts
import { Request, Response } from 'express';
import { LoginAdminRequest } from '../../../types/admin.types';
import { prisma } from '../../../config/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { HttpStatus, ApiResponse } from '../../../types/api.types';

export const loginAdmin = async (req: LoginAdminRequest, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email });

  try {
    const admin = await prisma.admin.findUnique({
      where: { email }
    });
    console.log('Admin found:', admin ? 'Yes' : 'No');

    if (!admin) {
      console.log('Error: Admin not found');
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Invalid credentials',
        error: 'Invalid credentials'
      } as ApiResponse);
      return;
    }

    // Check if admin role exists
    if (!admin.role) {
      console.log('Error: Admin role is missing');
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Admin role is missing',
        error: 'Admin role is missing'
      } as ApiResponse);
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Password match:', isMatch ? 'Yes' : 'No');

    if (!isMatch) {
      console.log('Error: Password does not match');
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Invalid credentials',
        error: 'Invalid credentials'
      } as ApiResponse);
      return;
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: '24h' }
    );
    console.log('Login successful, token generated');

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          id: admin.id,
          email: admin.email,
          role: admin.role
        }
      }
    } as ApiResponse);
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Server error',
      error: 'Internal server error'
    } as ApiResponse);
  }
};