import { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import {
  CreateTravelPackageData,
  UpdateTravelPackageData,
} from '../../types/travelPackage.types';
import { sendSuccess, sendError, HttpStatus } from '../../utils/response.utils';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Extend Request interface to include file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[];
}

// Helper function to get full image URL
const getImageUrl = (filename: string | null): string | null => {
  if (!filename) return null;
  return `${process.env.API_URL || 'http://localhost:5000'}/uploads/travel-packages/${filename}`;
};

// Get all travel packages
export const getAllTravelPackages = async (_req: Request, res: Response) => {
  try {
    const packages = await prisma.travelPackage.findMany();
    // Add full image URLs to response
    const packagesWithUrls = packages.map(pkg => ({
      ...pkg,
      images: JSON.parse(pkg.images).map((image: string) => getImageUrl(image))
    }));
    return sendSuccess(res, packagesWithUrls, 'Travel packages fetched successfully');
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
    
    // Add full image URLs to response
    const packageWithUrls = {
      ...travelPackage,
      images: JSON.parse(travelPackage.images).map((image: string) => getImageUrl(image))
    };
    
    return sendSuccess(res, packageWithUrls, 'Travel package fetched successfully');
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

          // Handle uploaded files
          const files = req.files as Express.Multer.File[];
          const images = files ? files.map(file => file.filename) : [];

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
              images: JSON.stringify(images),
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
    // Handle uploaded files
    const files = req.files as Express.Multer.File[];
    const images = files ? files.map(file => file.filename) : [];

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
        images: images.length > 0 ? JSON.stringify(images) : undefined,
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
    const packageToDelete = await prisma.travelPackage.findUnique({
      where: { id }
    });

    if (!packageToDelete) {
      return sendError(res, 'Travel package not found', 'Not found', HttpStatus.NOT_FOUND);
    }

    // Delete associated images
    const images = JSON.parse(packageToDelete.images);
    for (const image of images) {
      const imagePath = path.join('uploads/travel-packages', image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

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