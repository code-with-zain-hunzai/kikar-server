"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTravelPackageSchema = exports.createTravelPackageSchema = exports.difficultyEnum = void 0;
const zod_1 = require("zod");
exports.difficultyEnum = zod_1.z.enum(['Easy', 'Moderate', 'Challenging', 'Difficult']);
exports.createTravelPackageSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    price: zod_1.z.number().min(0, 'Price must be greater than or equal to 0'),
    originalPrice: zod_1.z.number().min(0).optional(),
    discount: zod_1.z.number().min(0).max(100).optional(),
    durationDays: zod_1.z.number().min(1, 'Duration must be at least 1 day'),
    location: zod_1.z.string().min(1, 'Location is required'),
    destinationId: zod_1.z.string().uuid('Invalid destination ID'),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    rating: zod_1.z.number().min(0).max(5).default(0),
    featured: zod_1.z.boolean().default(false),
    groupSize: zod_1.z.string().min(1, 'Group size is required'),
    bestTime: zod_1.z.string().min(1, 'Best time is required'),
    difficulty: exports.difficultyEnum
});
exports.updateTravelPackageSchema = exports.createTravelPackageSchema.partial();
//# sourceMappingURL=travelPackage.schema.js.map