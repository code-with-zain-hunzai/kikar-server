import { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import {
  CreateTravelPackageData,
  UpdateTravelPackageData,
} from '../../types/travelPackage.types';
import { sendSuccess, sendError, HttpStatus } from '../../utils/response.utils';

// Get all travel packages
export const getAllTravelPackages = async (_req: Request, res: Response) => {
  try {
    const packages = await prisma.travelPackage.findMany({
      include: {
        destination: true
      }
    });
    return sendSuccess(res, packages, 'Travel packages fetched successfully');
  } catch (error) {
    return sendError(
      res,
      (error as Error).message,
      'Failed to fetch travel packages',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

// Get travel package by ID
export const getTravelPackageById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const travelPackage = await prisma.travelPackage.findUnique({
      where: { id },
      include: {
        destination: true
      }
    });
    if (!travelPackage)
      return sendError(res, 'Travel package not found', 'Not found', HttpStatus.NOT_FOUND);
    return sendSuccess(res, travelPackage, 'Travel package fetched successfully');
  } catch (error) {
    return sendError(
      res,
      (error as Error).message,
      'Failed to fetch travel package',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

// Create multiple travel packages
export const createTravelPackage = async (req: Request, res: Response) => {
  console.log('Received request body:', JSON.stringify(req.body, null, 2));
  
  if (!req.body) {
    return sendError(
      res,
      'Request body is required',
      'Validation error',
      HttpStatus.BAD_REQUEST
    );
  }

  const packagesData: CreateTravelPackageData[] = Array.isArray(req.body) ? req.body : [req.body];

  try {
    // Validate required fields
    for (const packageData of packagesData) {
      const requiredFields = ['title', 'description', 'price', 'durationDays', 'location', 'destination', 'groupSize', 'bestTime', 'difficulty'];
      const missingFields = requiredFields.filter(field => !packageData[field as keyof CreateTravelPackageData]);
      
      if (missingFields.length > 0) {
        return sendError(
          res,
          `Missing required fields: ${missingFields.join(', ')}`,
          'Validation error',
          HttpStatus.BAD_REQUEST
        );
      }
    }

    const createdPackages = await Promise.all(
      packagesData.map(async (packageData) => {
        try {
          return await prisma.travelPackage.create({
            data: {
              title: packageData.title,
              description: packageData.description,
              price: Number(packageData.price),
              originalPrice: packageData.originalPrice ? Number(packageData.originalPrice) : undefined,
              discount: packageData.discount ? Number(packageData.discount) : undefined,
              durationDays: Number(packageData.durationDays),
              location: packageData.location,
              destinationId: packageData.destination,
              images: packageData.images || [],
              rating: Number(packageData.rating || 0),
              featured: packageData.featured || false,
              groupSize: packageData.groupSize,
              bestTime: packageData.bestTime,
              difficulty: packageData.difficulty
            },
            include: {
              destination: true
            }
          });
        } catch (error) {
          console.error('Error creating package:', error);
          throw error;
        }
      })
    );

    return sendSuccess(
      res,
      createdPackages,
      'Travel packages created successfully',
      HttpStatus.CREATED
    );
  } catch (error) {
    console.error('Create travel package error:', error);
    return sendError(
      res,
      (error as Error).message,
      'Failed to create travel packages',
      HttpStatus.BAD_REQUEST
    );
  }
};

// Update multiple travel packages
export const updateTravelPackage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateTravelPackageData = req.body;

  try {
    const updatedPackage = await prisma.travelPackage.update({
      where: { id },
      data: {
        title: updateData.title,
        description: updateData.description,
        price: updateData.price ? Number(updateData.price) : undefined,
        originalPrice: updateData.originalPrice ? Number(updateData.originalPrice) : undefined,
        discount: updateData.discount ? Number(updateData.discount) : undefined,
        durationDays: updateData.durationDays ? Number(updateData.durationDays) : undefined,
        location: updateData.location,
        destinationId: updateData.destination,
        images: updateData.images,
        rating: updateData.rating ? Number(updateData.rating) : undefined,
        featured: updateData.featured,
        groupSize: updateData.groupSize,
        bestTime: updateData.bestTime,
        difficulty: updateData.difficulty
      },
      include: {
        destination: true
      }
    });

    return sendSuccess(res, updatedPackage, 'Travel package updated successfully');
  } catch (error) {
    console.error('Update travel package error:', error);
    return sendError(
      res,
      (error as Error).message,
      'Failed to update travel package',
      HttpStatus.BAD_REQUEST
    );
  }
};

// Delete a travel package
export const deleteTravelPackage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.travelPackage.delete({
      where: { id }
    });

    return sendSuccess(res, null, 'Travel package deleted successfully');
  } catch (error) {
    console.error('Delete travel package error:', error);
    return sendError(
      res,
      (error as Error).message,
      'Failed to delete travel package',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};