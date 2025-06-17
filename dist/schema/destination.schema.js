"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDestinationSchema = exports.createDestinationSchema = exports.destinationTypeEnum = void 0;
const zod_1 = require("zod");
exports.destinationTypeEnum = zod_1.z.enum(['valley', 'peak', 'lake', 'glacier', 'cultural']);
exports.createDestinationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    location: zod_1.z.string().min(1, 'Location is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    image: zod_1.z.string().optional(),
    highlights: zod_1.z.array(zod_1.z.string()).optional(),
    type: exports.destinationTypeEnum,
    rating: zod_1.z.number().min(0).max(5).default(0)
});
exports.updateDestinationSchema = exports.createDestinationSchema.partial();
//# sourceMappingURL=destination.schema.js.map