"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTravelPackageSchema = exports.CreateTravelPackageSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.CreateTravelPackageSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(100),
    description: zod_1.z.string().min(10).max(1000),
    price: zod_1.z.number().positive(),
    originalPrice: zod_1.z.number().positive().optional(),
    discount: zod_1.z.number().min(0).max(100).optional(),
    difficulty: zod_1.z.nativeEnum(client_1.Difficulty),
    durationDays: zod_1.z.number().positive(),
    location: zod_1.z.string().min(1),
    destination: zod_1.z.string().uuid(),
    images: zod_1.z.array(zod_1.z.string().url()).max(5).optional(),
    rating: zod_1.z.number().min(0).max(5).optional(),
    featured: zod_1.z.boolean().optional(),
    groupSize: zod_1.z.string().min(1),
    bestTime: zod_1.z.string().min(1),
});
exports.UpdateTravelPackageSchema = exports.CreateTravelPackageSchema.partial();
//# sourceMappingURL=travelPackage.types.js.map