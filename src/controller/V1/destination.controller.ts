import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  CreateDestinationData,
  UpdateDestinationData,
} from "../../types/destination.types";
import { sendSuccess, sendError, HttpStatus } from "../../utils/response.utils";
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Extend Request interface to include file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Helper function to save base64 image
const saveBase64Image = (base64String: string): string => {
  const uploadsDir = 'uploads/destinations';
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  
  // Generate unique filename
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename = `destination-${uniqueSuffix}.jpg`;
  const filepath = path.join(uploadsDir, filename);
  
  // Save the file
  fs.writeFileSync(filepath, buffer);
  
  return filename;
};

// Helper function to get full image URL
const getImageUrl = (filename: string | null): string | null => {
  if (!filename) return null;
  return `${process.env.API_URL || 'http://localhost:5000'}/uploads/destinations/${filename}`;
};

export const createDestination = async (req: MulterRequest, res: Response) => {
  const body: CreateDestinationData = req.body;

  try {
    // Handle file upload
    if (req.file) {
      body.image = req.file.filename;
    }
    // Handle base64 image
    else if (body.image && body.image.startsWith('data:image')) {
      body.image = saveBase64Image(body.image);
    }

    const destination = await prisma.destination.create({
      data: {
        ...body,
        highlights: body.highlights ? JSON.stringify(body.highlights) : "[]",
      },
    });

    // Add full image URL to response
    const response = {
      ...destination,
      image: getImageUrl(destination.image),
      highlights: typeof destination.highlights === 'string' ? JSON.parse(destination.highlights) : destination.highlights
    };

    return sendSuccess(
      res,
      response,
      "Destination created successfully",
      HttpStatus.CREATED
    );
  } catch (error) {
    return sendError(
      res,
      (error as Error).message,
      "Failed to create destination",
      HttpStatus.BAD_REQUEST
    );
  }
};

export const updateDestination = async (req: MulterRequest, res: Response) => {
  const { id } = req.params;
  const body: UpdateDestinationData = req.body;

  try {
    // Handle file upload
    if (req.file) {
      body.image = req.file.filename;
    }
    // Handle base64 image
    else if (body.image && body.image.startsWith('data:image')) {
      body.image = saveBase64Image(body.image);
    }

    const destination = await prisma.destination.update({
      where: { id },
      data: {
        ...body,
        highlights: body.highlights ? JSON.stringify(body.highlights) : undefined,
      },
    });

    // Add full image URL to response
    const response = {
      ...destination,
      image: getImageUrl(destination.image),
      highlights: typeof destination.highlights === 'string' ? JSON.parse(destination.highlights) : destination.highlights
    };

    return sendSuccess(res, response, "Destination updated successfully");
  } catch (error) {
    if ((error as Error).message.includes("Record to update does not exist")) {
      return sendError(
        res,
        "Destination not found",
        "Destination not found",
        HttpStatus.NOT_FOUND
      );
    }
    return sendError(
      res,
      (error as Error).message,
      "Failed to update destination",
      HttpStatus.BAD_REQUEST
    );
  }
};

export const getAllDestinations = async (_req: Request, res: Response) => {
  try {
    const destinations = await prisma.destination.findMany();
    
    // Add full image URLs to response
    const response = destinations.map(destination => ({
      ...destination,
      image: getImageUrl(destination.image),
    }));

    return sendSuccess(res, response, "Destinations fetched successfully");
  } catch (error) {
    return sendError(
      res,
      (error as Error).message,
      "Failed to fetch destinations",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export const getDestinationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const destination = await prisma.destination.findUnique({
      where: { id },
    });
    if (!destination) {
      return sendError(
        res,
        "Destination not found",
        "Destination not found",
        HttpStatus.NOT_FOUND
      );
    }

    // Add full image URL to response
    const response = {
      ...destination,
      image: getImageUrl(destination.image),
      highlights: typeof destination.highlights === 'string' ? JSON.parse(destination.highlights) : destination.highlights
    };

    return sendSuccess(res, response, "Destination fetched successfully");
  } catch (error) {
    return sendError(
      res,
      (error as Error).message,
      "Failed to fetch destination",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export const deleteDestination = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const destination = await prisma.destination.delete({
      where: { id },
    });
    return sendSuccess(res, null, "Destination deleted successfully");
  } catch (error) {
    if ((error as Error).message.includes("Record to delete does not exist")) {
      return sendError(
        res,
        "Destination not found",
        "Destination not found",
        HttpStatus.NOT_FOUND
      );
    }
    return sendError(
      res,
      (error as Error).message,
      "Failed to delete destination",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
