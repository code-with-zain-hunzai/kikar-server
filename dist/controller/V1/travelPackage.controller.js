"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTravelPackage = exports.updateTravelPackage = exports.createTravelPackage = exports.getTravelPackageById = exports.getAllTravelPackages = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const response_utils_1 = require("../../utils/response.utils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Helper function to save base64 image
const saveBase64Image = (base64String) => {
    const uploadsDir = 'uploads/travel-packages';
    if (!fs_1.default.existsSync(uploadsDir)) {
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    }
    // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `package-${uniqueSuffix}.jpg`;
    const filepath = path_1.default.join(uploadsDir, filename);
    // Save the file
    fs_1.default.writeFileSync(filepath, buffer);
    return filename;
};
// Helper function to get full image URL
const getImageUrl = (filename) => {
    if (!filename)
        return null;
    return `${process.env.API_URL || 'http://localhost:5000'}/uploads/travel-packages/${filename}`;
};
// Helper function to validate base64 image string
const isValidBase64Image = (str) => {
    try {
        // Check if the string starts with data:image
        if (!str.startsWith('data:image')) {
            return false;
        }
        // Check if the string is a valid base64
        const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
        const base64Data = str.replace(base64Regex, '');
        return Buffer.from(base64Data, 'base64').toString('base64') === base64Data;
    }
    catch (error) {
        return false;
    }
};
// Get all travel packages
const getAllTravelPackages = async (_req, res) => {
    try {
        const packages = await prisma_1.default.travelPackage.findMany();
        return (0, response_utils_1.sendSuccess)(res, packages, 'Travel packages fetched successfully');
    }
    catch (error) {
        return (0, response_utils_1.sendError)(res, error.message, 'Failed to fetch travel packages', response_utils_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.getAllTravelPackages = getAllTravelPackages;
// Get travel package by ID
const getTravelPackageById = async (req, res) => {
    const { id } = req.params;
    try {
        const travelPackage = await prisma_1.default.travelPackage.findUnique({
            where: { id }
        });
        if (!travelPackage)
            return (0, response_utils_1.sendError)(res, 'Travel package not found', 'Not found', response_utils_1.HttpStatus.NOT_FOUND);
        return (0, response_utils_1.sendSuccess)(res, travelPackage, 'Travel package fetched successfully');
    }
    catch (error) {
        return (0, response_utils_1.sendError)(res, error.message, 'Failed to fetch travel package', response_utils_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.getTravelPackageById = getTravelPackageById;
// Create multiple travel packages
const createTravelPackage = async (req, res) => {
    console.log('Received request body:', JSON.stringify(req.body, null, 2));
    if (!req.body) {
        return (0, response_utils_1.sendError)(res, 'Request body is required', 'Validation error', response_utils_1.HttpStatus.BAD_REQUEST);
    }
    const packagesData = Array.isArray(req.body) ? req.body : [req.body];
    try {
        // Validate required fields
        for (const packageData of packagesData) {
            const requiredFields = ['title', 'description', 'price', 'durationDays', 'location', 'destination', 'groupSize', 'bestTime', 'difficulty'];
            const missingFields = requiredFields.filter(field => !packageData[field]);
            if (missingFields.length > 0) {
                return (0, response_utils_1.sendError)(res, `Missing required fields: ${missingFields.join(', ')}`, 'Validation error', response_utils_1.HttpStatus.BAD_REQUEST);
            }
            // Handle images
            if (packageData.images && Array.isArray(packageData.images)) {
                const savedImages = [];
                for (const image of packageData.images) {
                    if (typeof image === 'string' && image.startsWith('data:image')) {
                        if (!isValidBase64Image(image)) {
                            return (0, response_utils_1.sendError)(res, 'Invalid image format. Images must be provided as base64 strings starting with data:image/', 'Validation error', response_utils_1.HttpStatus.BAD_REQUEST);
                        }
                        savedImages.push(saveBase64Image(image));
                    }
                    else if (typeof image === 'string') {
                        savedImages.push(image);
                    }
                }
                packageData.images = savedImages;
            }
        }
        const createdPackages = await Promise.all(packagesData.map(async (packageData) => {
            try {
                // Check if package with same destination already exists
                const existingPackage = await prisma_1.default.travelPackage.findFirst({
                    where: {
                        destination: packageData.destination
                    }
                });
                if (existingPackage) {
                    throw new Error(`A package for destination "${packageData.destination}" already exists`);
                }
                const createdPackage = await prisma_1.default.travelPackage.create({
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
                    images: JSON.parse(createdPackage.images).map((image) => getImageUrl(image))
                };
            }
            catch (error) {
                console.error('Error creating package:', error);
                throw error;
            }
        }));
        return (0, response_utils_1.sendSuccess)(res, createdPackages, 'Travel packages created successfully', response_utils_1.HttpStatus.CREATED);
    }
    catch (error) {
        console.error('Create travel package error:', error);
        return (0, response_utils_1.sendError)(res, error.message, 'Failed to create travel packages', response_utils_1.HttpStatus.BAD_REQUEST);
    }
};
exports.createTravelPackage = createTravelPackage;
// Update multiple travel packages
const updateTravelPackage = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        // Handle images
        if (updateData.images && Array.isArray(updateData.images)) {
            const savedImages = [];
            for (const image of updateData.images) {
                if (typeof image === 'string' && image.startsWith('data:image')) {
                    if (!isValidBase64Image(image)) {
                        return (0, response_utils_1.sendError)(res, 'Invalid image format. Images must be provided as base64 strings starting with data:image/', 'Validation error', response_utils_1.HttpStatus.BAD_REQUEST);
                    }
                    savedImages.push(saveBase64Image(image));
                }
                else if (typeof image === 'string') {
                    savedImages.push(image);
                }
            }
            updateData.images = savedImages;
        }
        const updatedPackage = await prisma_1.default.travelPackage.update({
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
            images: JSON.parse(updatedPackage.images).map((image) => getImageUrl(image))
        };
        return (0, response_utils_1.sendSuccess)(res, response, 'Travel package updated successfully');
    }
    catch (error) {
        console.error('Update travel package error:', error);
        return (0, response_utils_1.sendError)(res, error.message, 'Failed to update travel package', response_utils_1.HttpStatus.BAD_REQUEST);
    }
};
exports.updateTravelPackage = updateTravelPackage;
// Delete a travel package
const deleteTravelPackage = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma_1.default.travelPackage.delete({
            where: { id }
        });
        return (0, response_utils_1.sendSuccess)(res, null, 'Travel package deleted successfully');
    }
    catch (error) {
        console.error('Delete travel package error:', error);
        return (0, response_utils_1.sendError)(res, error.message, 'Failed to delete travel package', response_utils_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.deleteTravelPackage = deleteTravelPackage;
//# sourceMappingURL=travelPackage.controller.js.map