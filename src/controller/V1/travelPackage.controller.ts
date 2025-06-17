import { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import {
  CreateTravelPackageData,
  UpdateTravelPackageData,
} from '../../types/travelPackage.types';
import { sendSuccess, sendError, HttpStatus } from '../../utils/response.utils';
import fs from 'fs';
import path from 'path';

// Extend Request interface to include file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Helper function to save base64 image
const saveBase64Image = (base64String: string): string => {
  const uploadsDir = 'uploads/travel-packages';
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  
  // Generate unique filename
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename = `package-${uniqueSuffix}.jpg`;
  const filepath = path.join(uploadsDir, filename);
  
  // Save the file
  fs.writeFileSync(filepath, buffer);
  
  return filename;
};

// Helper function to get full image URL
const getImageUrl = (filename: string | null): string | null => {
  if (!filename) return null;
  return `${process.env.API_URL || 'http://localhost:5000'}/uploads/travel-packages/${filename}`;
};

// Helper function to validate base64 image string
const isValidBase64Image = (str: string): boolean => {
  try {
    // Check if the string starts with data:image
    if (!str.startsWith('data:image')) {
      return false;
    }
    // Check if the string is a valid base64
    const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
    const base64Data = str.replace(base64Regex, '');
    return Buffer.from(base64Data, 'base64').toString('base64') === base64Data;
  } catch (error) {
    return false;
  }
};

// Get all travel packages
export const getAllTravelPackages = async (_req: Request, res: Response) => {
  try {
    const packages = await prisma.travelPackage.findMany();
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
      where: { id }
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
export const createTravelPackage = async (req: MulterRequest, res: Response) => {
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

      // Handle images
      if (packageData.images && Array.isArray(packageData.images)) {
        const savedImages = [];
        for (const image of packageData.images) {
          if (typeof image === 'string' && image.startsWith('data:image')) {
            if (!isValidBase64Image(image)) {
              return sendError(
                res,
                'Invalid image format. Images must be provided as base64 strings starting with data:image/',
                'Validation error',
                HttpStatus.BAD_REQUEST
              );
            }
            savedImages.push(saveBase64Image(image));
          } else if (typeof image === 'string') {
            savedImages.push(image);
          }
        }
        packageData.images = savedImages;
      }
    }

    const createdPackages = await Promise.all(
      packagesData.map(async (packageData) => {
        try {
          // Check if package with same destination already exists
          const existingPackage = await prisma.travelPackage.findFirst({
            where: {
              destination: packageData.destination
            }
          });

          if (existingPackage) {
            throw new Error(`A package for destination "${packageData.destination}" already exists`);
          }

          const createdPackage = await prisma.travelPackage.create({
            data: {
              title: packageData.title,
              description: packageData.description,
              price: Number(packageData.price),
              originalPrice: packageData.originalPrice ? Number(packageData.originalPrice) : undefined,
              discount: packageData.discount ? Number(packageData.discount) : undefined,
              durationDays: Number(packageData.durationDays),
              location: packageData.location,
              destination: packageData.destination,
              images: Array.isArray(packageData.images) ? JSON.stringify(packageData.images) : packageData.images || '[]',
              rating: Number(packageData.rating || 0),
              featured: packageData.featured || false,
              groupSize: packageData.groupSize,
              bestTime: packageData.bestTime,
              difficulty: packageData.difficulty
            }
          });

          // Add full image URLs to response
          return {
            ...createdPackage,
            images: JSON.parse(createdPackage.images).map((image: string) => getImageUrl(image))
          };
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
export const updateTravelPackage = async (req: MulterRequest, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateTravelPackageData = req.body;

  try {
    // Handle images
    if (updateData.images && Array.isArray(updateData.images)) {
      const savedImages = [];
      for (const image of updateData.images) {
        if (typeof image === 'string' && image.startsWith('data:image')) {
          if (!isValidBase64Image(image)) {
            return sendError(
              res,
              'Invalid image format. Images must be provided as base64 strings starting with data:image/',
              'Validation error',
              HttpStatus.BAD_REQUEST
            );
          }
          savedImages.push(saveBase64Image(image));
        } else if (typeof image === 'string') {
          savedImages.push(image);
        }
      }
      updateData.images = savedImages;
    }

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
        destination: updateData.destination,
        images: Array.isArray(updateData.images) ? JSON.stringify(updateData.images) : updateData.images,
        rating: updateData.rating ? Number(updateData.rating) : undefined,
        featured: updateData.featured,
        groupSize: updateData.groupSize,
        bestTime: updateData.bestTime,
        difficulty: updateData.difficulty
      }
    });

    // Add full image URLs to response
    const response = {
      ...updatedPackage,
      images: JSON.parse(updatedPackage.images).map((image: string) => getImageUrl(image))
    };

    return sendSuccess(res, response, 'Travel package updated successfully');
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