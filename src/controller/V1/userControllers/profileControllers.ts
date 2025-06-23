import { Request, Response } from 'express';
import { prisma } from '../../../config/db';
import { sendSuccess, sendError, HttpStatus } from '../../../utils/response.utils';

// Middleware to get user role from JWT (you'll need to implement this)
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const getProfiles = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userRole = req.user?.role;
    
    if (!userRole) {
      return sendError(res, 'Unauthorized', 'User role not found', HttpStatus.UNAUTHORIZED);
    }

    const { type, limit = 10, page = 1, city, rating } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const profiles: Record<string, any> = {};

    // If specific type is requested
    if (type && typeof type === 'string') {
      if (type === userRole) {
        return sendError(res, 'Invalid request', 'Cannot fetch your own user type', HttpStatus.BAD_REQUEST);
      }
      
      const profileData = await fetchProfilesByType(type, skip, Number(limit), city as string, rating as string);
      profiles[type] = profileData;
    } else {
      // Fetch all other user types
      const userTypes = ['tourist', 'guide', 'hotel', 'transporter'];
      
      for (const type of userTypes) {
        if (type !== userRole) {
          profiles[type] = await fetchProfilesByType(type, skip, Number(limit), city as string, rating as string);
        }
      }
    }

    return sendSuccess(res, {
      profiles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        hasMore: profiles[Object.keys(profiles)[0]]?.length === Number(limit)
      }
    }, 'Profiles fetched successfully');

  } catch (err) {
    console.error('Get profiles error:', err);
    return sendError(res, 'Internal server error', 'Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

async function fetchProfilesByType(type: string, skip: number, limit: number, city?: string, rating?: string) {
  const baseQuery = {
    skip,
    take: limit,
  };

  switch (type) {
    case 'tourist':
      return await prisma.tourist.findMany({
        ...baseQuery,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });

    case 'guide':
      const guideWhere: any = {};
      if (city) guideWhere.city = { contains: city, mode: 'insensitive' };
      if (rating) guideWhere.rating = { gte: parseFloat(rating) };

      return await prisma.guide.findMany({
        ...baseQuery,
        where: guideWhere,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          experience: true,
          languages: true,
          specialties: true,
          availability: true,
          bio: true,
          createdAt: true,
        },
      });

    case 'hotel':
      const hotelWhere: any = {};
      if (city) hotelWhere.city = { contains: city, mode: 'insensitive' };
      if (rating) hotelWhere.rating = { gte: parseFloat(rating) };

      return await prisma.hotel.findMany({
        ...baseQuery,
        where: hotelWhere,
        select: {
          id: true,
          email: true,
          hotelName: true,
          phone: true,
          address: true,
          city: true,
          amenities: true,
          roomTypes: true,
          description: true,
          createdAt: true,
        },
      });

    case 'transporter':
      const transporterWhere: any = {};
      if (city) transporterWhere.serviceAreas = { has: city };
      if (rating) transporterWhere.rating = { gte: parseFloat(rating) };

      return await prisma.transporter.findMany({
        ...baseQuery,
        where: transporterWhere,
        select: {
          id: true,
          email: true,
          businessName: true,
          phone: true,
          vehicleTypes: true,
          createdAt: true,
        },
      });

    default:
      return [];
  }
}

export const getProfileById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { type, id } = req.params;
    const userRole = req.user?.role;

    if (type === userRole) {
      return sendError(res, 'Invalid request', 'Cannot fetch your own profile this way', HttpStatus.BAD_REQUEST);
    }

    let profile;
    
    switch (type) {
      case 'tourist':
        profile = await prisma.tourist.findUnique({
          where: { id },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true
          },
        });
        break;

      case 'guide':
        profile = await prisma.guide.findUnique({
          where: { id },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            experience: true,
            languages: true,
            specialties: true,
            bio: true,
            createdAt: true,
          },
        });
        break;

      case 'hotel':
        profile = await prisma.hotel.findUnique({
          where: { id },
          select: {
            id: true,
            email: true,
            hotelName: true,
            phone: true,
            address: true,
            city: true,
            amenities: true,
            roomTypes: true
          },
        });
        break;

      case 'transporter':
        profile = await prisma.transporter.findUnique({
          where: { id },
          select: {
            id: true,
            email: true,
            businessName: true,
            phone: true,
            vehicleTypes: true,
            createdAt: true,
          },
        });
        break;

      default:
        return sendError(res, 'Invalid type', 'Invalid profile type', HttpStatus.BAD_REQUEST);
    }

    if (!profile) {
      return sendError(res, 'Profile not found', 'Profile not found', HttpStatus.NOT_FOUND);
    }

    return sendSuccess(res, { profile: { ...profile, role: type } }, 'Profile fetched successfully');

  } catch (err) {
    console.error('Get profile by ID error:', err);
    return sendError(res, 'Internal server error', 'Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
};