import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  CreateDestinationData,
  UpdateDestinationData,
} from "../../types/destination.types";
import { sendSuccess, sendError, HttpStatus } from "../../utils/response.utils";
import { getImageUrl, saveBase64Image, deleteImage } from "../../middleware/upload.middleware";

const prisma = new PrismaClient();

// Extend Request interface to include file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const createDestination = async (req: MulterRequest, res: Response) => {
  const body: CreateDestinationData = req.body;

  try {
    // Handle file upload
    if (req.file) {
      body.image = req.file.filename;
    }
    // Handle base64 image
    else if (body.image && body.image.startsWith('data:image')) {
      body.image = saveBase64Image(body.image, 'destination');
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
      image: getImageUrl(destination.image, 'destination'),
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
      body.image = saveBase64Image(body.image, 'destination');
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
      image: getImageUrl(destination.image, 'destination'),
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
      image: getImageUrl(destination.image, 'destination'),
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
      image: getImageUrl(destination.image, 'destination'),
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

    // Delete associated image
    if (destination.image) {
      deleteImage(destination.image, 'destination');
    }

    await prisma.destination.delete({
      where: { id },
    });

    return sendSuccess(res, null, "Destination deleted successfully");
  } catch (error) {
    return sendError(
      res,
      (error as Error).message,
      "Failed to delete destination",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
