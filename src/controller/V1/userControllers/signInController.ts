import { Request, Response } from 'express';
import { prisma } from '../../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config/jwt';
import { sendSuccess, sendError, HttpStatus } from '../../../utils/response.utils';
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    let user: any = null;
    let userType: string | null = null;

    // Try to find the user in each user type
    user = await prisma.tourist.findUnique({ where: { email } });
    if (user) userType = 'tourist';

    if (!user) {
      user = await prisma.guide.findUnique({ where: { email } });
      if (user) userType = 'guide';
    }

    if (!user) {
      user = await prisma.hotel.findUnique({ where: { email } });
      if (user) userType = 'hotel';
    }

    if (!user) {
      user = await prisma.transporter.findUnique({ where: { email } });
      if (user) userType = 'transporter';
    }

    if (!user || !userType) {
      return sendError(res, 'Invalid credentials', 'Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, 'Invalid credentials', 'Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const { password: _password, ...userWithoutPassword } = user;

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: userType }, JWT_SECRET || "your-secret-key", { expiresIn: '1d' });
    console.log(token)
    console.log('JWT Token:', token);

    const decoded = jwtDecode<JwtPayload>(token);
    console.log("Decoded token:", decoded);

    const allowedRoles = ["tourist", "guide", "hotel", "transporter"];
    if (!allowedRoles.includes(decoded.role)) {
      throw new Error(`Access denied: Role is ${decoded.role}`);
    }

    const feed: Record<string, any[]> = {};
    
    if (userType !== 'tourist') {
      feed.tourists = await prisma.tourist.findMany({
        select: {
          id: true,
          email: true,
          phone: true,
          country: true,
          travelStyle: true,
          interests: true,
          budget: true,
          frequency: true,
          groupSize: true,
          profileImage: true,
          createdAt: true,
        },
      });
    }
    
    if (userType !== 'guide') {
      feed.guides = await prisma.guide.findMany({
        select: {
          id: true,
          email: true,
          phone: true,
          location: true,
          experience: true,
          languages: true,
          certifications: true,
          tourTypes: true,
          specialties: true,
          maxGroupSize: true,
          hourlyRate: true,
          dailyRate: true,
          availability: true,
          bio: true,
          idCardFront: true,
          idCardBack: true,
          profileImage: true,
          createdAt: true,
        },
      });
    }
    
    if (userType !== 'hotel') {
      feed.hotels = await prisma.hotel.findMany({
        select: {
          id: true,
          email: true,
          hotelName: true,
          phone: true,
          address: true,
          city: true,
          state: true,
          zipCode: true,
          country: true,
          description: true,
          amenities: true,
          services: true,
          totalRooms: true,
          roomTypes: true,
          basePrice: true,
          currency: true,
          policies: true,
          profileImage: true,
          gallery: true,
          createdAt: true,
        },
      });
    }
    
    if (userType !== 'transporter') {
      feed.transporters = await prisma.transporter.findMany({
        select: {
          id: true,
          email: true,
          businessName: true,
          phone: true,
          serviceArea: true,
          vehicleTypes: true,
          serviceTypes: true,
          fleetSize: true,
          maxCapacity: true,
          businessLicense: true,
          driverLicense: true,
          insurance: true,
          certifications: true,
          cnicFront: true,
          cnicBack: true,
          profileImage: true,
          createdAt: true,
        },
      });
    }

    return sendSuccess(res, {
      accessToken: token,
      user: { ...userWithoutPassword, role: userType },
      feed,
      feedCount: {
        tourists: feed.tourists?.length || 0,
        guides: feed.guides?.length || 0,
        hotels: feed.hotels?.length || 0,
        transporters: feed.transporters?.length || 0,
      }
    }, 'Login successful');
    
  } catch (err) {
    console.error('Login error:', err);
    return sendError(res, 'Internal server error', 'Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('accessToken');
  return sendSuccess(res, null, 'Logout successful');
};