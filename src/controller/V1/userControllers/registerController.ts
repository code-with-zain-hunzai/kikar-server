import { Request, Response } from 'express';
import { prisma } from '../../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config/jwt';
import { sendSuccess, sendError, HttpStatus } from '../../../utils/response.utils';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { role, password, confirmPassword, ...rest } = req.body;

  if (!role || !['tourist', 'guide', 'hotel', 'transporter'].includes(role)) {
    return sendError(res, 'Invalid role', 'Role must be one of tourist, guide, hotel, transporter', HttpStatus.BAD_REQUEST);
  }

  if (!password) {
    return sendError(res, 'Password is required', 'Password is required', HttpStatus.BAD_REQUEST);
  }

  // Check for duplicate email in all user tables
  const email = rest.email;
  if (!email) {
    return sendError(res, 'Email is required', 'Email is required', HttpStatus.BAD_REQUEST);
  }

  const existingUser =
    (await prisma.tourist.findUnique({ where: { email } })) ||
    (await prisma.guide.findUnique({ where: { email } })) ||
    (await prisma.hotel.findUnique({ where: { email } })) ||
    (await prisma.transporter.findUnique({ where: { email } }));

  if (existingUser) {
    return sendError(res, 'Email already exists', 'Email already exists', HttpStatus.BAD_REQUEST);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  let user;
  try {
    if (role === 'tourist') {
      user = await prisma.tourist.create({
        data: {
          ...rest,
          password: hashedPassword,
        },
      });
    } else if (role === 'guide') {
      user = await prisma.guide.create({
        data: {
          ...rest,
          password: hashedPassword,
        },
      });
    } else if (role === 'hotel') {
      user = await prisma.hotel.create({
        data: {
          ...rest,
          password: hashedPassword,
        },
      });
    } else if (role === 'transporter') {
      user = await prisma.transporter.create({
        data: {
          ...rest,
          password: hashedPassword,
        },
      });
    }
  } catch (err) {
    return sendError(res, 'Registration failed', 'Could not register user', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  // Remove password from user object
  if (!user) {
    return sendError(res, 'Registration failed', 'User creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  const { password: _password, ...userWithoutPassword } = user as any;

  // Generate JWT
  const token = jwt.sign({ id: user.id, role }, JWT_SECRET, { expiresIn: '1d' });

  // Set token in cookie
  res.cookie('accessToken', token, {
    httpOnly: true,      // Prevents JS access to the cookie
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    sameSite: 'lax',    
    maxAge: 24 * 60 * 60 * 1000 
  });

  return sendSuccess(
    res,
    {
      user: { ...userWithoutPassword, role },
    },
    'Registration successful'
  );
};
