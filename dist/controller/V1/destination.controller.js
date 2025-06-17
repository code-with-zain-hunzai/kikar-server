"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDestination = exports.getDestinationById = exports.getAllDestinations = exports.updateDestination = exports.createDestination = void 0;
const client_1 = require("@prisma/client");
const response_utils_1 = require("../../utils/response.utils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
// Helper function to save base64 image
const saveBase64Image = (base64String) => {
    const uploadsDir = 'uploads/destinations';
    if (!fs_1.default.existsSync(uploadsDir)) {
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    }
    // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `destination-${uniqueSuffix}.jpg`;
    const filepath = path_1.default.join(uploadsDir, filename);
    // Save the file
    fs_1.default.writeFileSync(filepath, buffer);
    return filename;
};
// Helper function to get full image URL
const getImageUrl = (filename) => {
    if (!filename)
        return null;
    return `${process.env.API_URL || 'http://localhost:5000'}/uploads/destinations/${filename}`;
};
const createDestination = async (req, res) => {
    const body = req.body;
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
        };
        return (0, response_utils_1.sendSuccess)(res, response, "Destination created successfully", response_utils_1.HttpStatus.CREATED);
    }
    catch (error) {
        return (0, response_utils_1.sendError)(res, error.message, "Failed to create destination", response_utils_1.HttpStatus.BAD_REQUEST);
    }
};
exports.createDestination = createDestination;
const updateDestination = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
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
        };
        return (0, response_utils_1.sendSuccess)(res, response, "Destination updated successfully");
    }
    catch (error) {
        if (error.message.includes("Record to update does not exist")) {
            return (0, response_utils_1.sendError)(res, "Destination not found", "Destination not found", response_utils_1.HttpStatus.NOT_FOUND);
        }
        return (0, response_utils_1.sendError)(res, error.message, "Failed to update destination", response_utils_1.HttpStatus.BAD_REQUEST);
    }
};
exports.updateDestination = updateDestination;
const getAllDestinations = async (_req, res) => {
    try {
        const destinations = await prisma.destination.findMany();
        // Add full image URLs to response
        const response = destinations.map(destination => ({
            ...destination,
            image: getImageUrl(destination.image),
        }));
        return (0, response_utils_1.sendSuccess)(res, response, "Destinations fetched successfully");
    }
    catch (error) {
        return (0, response_utils_1.sendError)(res, error.message, "Failed to fetch destinations", response_utils_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.getAllDestinations = getAllDestinations;
const getDestinationById = async (req, res) => {
    const { id } = req.params;
    try {
        const destination = await prisma.destination.findUnique({
            where: { id },
        });
        if (!destination) {
            return (0, response_utils_1.sendError)(res, "Destination not found", "Destination not found", response_utils_1.HttpStatus.NOT_FOUND);
        }
        // Add full image URL to response
        const response = {
            ...destination,
            image: getImageUrl(destination.image),
        };
        return (0, response_utils_1.sendSuccess)(res, response, "Destination fetched successfully");
    }
    catch (error) {
        return (0, response_utils_1.sendError)(res, error.message, "Failed to fetch destination", response_utils_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.getDestinationById = getDestinationById;
const deleteDestination = async (req, res) => {
    const { id } = req.params;
    try {
        const destination = await prisma.destination.delete({
            where: { id },
        });
        return (0, response_utils_1.sendSuccess)(res, null, "Destination deleted successfully");
    }
    catch (error) {
        if (error.message.includes("Record to delete does not exist")) {
            return (0, response_utils_1.sendError)(res, "Destination not found", "Destination not found", response_utils_1.HttpStatus.NOT_FOUND);
        }
        return (0, response_utils_1.sendError)(res, error.message, "Failed to delete destination", response_utils_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.deleteDestination = deleteDestination;
//# sourceMappingURL=destination.controller.js.map