import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  CreateDestinationData,
  UpdateDestinationData,
} from "../../../types/destination.types";
import { sendSuccess, sendError, HttpStatus } from "../../../utils/response.utils";

const prisma = new PrismaClient();

// Extend Request interface to include file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const createDestination = async (req: MulterRequest, res: Response) => {
  const body: CreateDestinationData = req.body;

  try {
    // Store the Cloudinary URL directly
    const image = body.image || null;

    const destination = await prisma.destination.create({
      data: {
        ...body,
        image,
        highlights: body.highlights ? JSON.stringify(body.highlights) : "[]",
      },
    });

    // Return the destination with the original Cloudinary URL
    const response = {
      ...destination,
      image: destination.image,
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
    // Use the Cloudinary URL directly from the request
    const image = body.image || undefined;

    const destination = await prisma.destination.update({
      where: { id },
      data: {
        ...body,
        image,
        highlights: body.highlights ? JSON.stringify(body.highlights) : undefined,
      },
    });

    // Return the destination with the original Cloudinary URL
    const response = {
      ...destination,
      image: destination.image,
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
    
    // Return the destinations with their original Cloudinary URLs
    const response = destinations.map((destination: any) => ({
      ...destination,
      image: destination.image,
      highlights: typeof destination.highlights === 'string' ? JSON.parse(destination.highlights) : destination.highlights
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

    // Return the destination with its original Cloudinary URL
    const response = {
      ...destination,
      image: destination.image,
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
