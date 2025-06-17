"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDestinationSchema = exports.CreateDestinationSchema = void 0;
const zod_1 = require("zod");
exports.CreateDestinationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    location: zod_1.z.string().min(2).max(100),
    description: zod_1.z.string().min(10).max(1000),
    image: zod_1.z.string().url().optional(),
    highlights: zod_1.z.array(zod_1.z.string().min(3).max(100)).max(10).optional(),
    type: zod_1.z.enum(['valley', 'peak', 'lake', 'glacier', 'cultural']),
    rating: zod_1.z.number().min(0).max(5).optional(),
});
exports.UpdateDestinationSchema = exports.CreateDestinationSchema.partial();
//# sourceMappingURL=destination.types.js.map