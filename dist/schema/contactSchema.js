"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFormSchema = void 0;
const zod_1 = require("zod");
exports.contactFormSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, "Full name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    phone: zod_1.z.string().optional(),
    destination: zod_1.z.string().min(2, "Destination must be at least 2 characters"),
    travelType: zod_1.z.string().nonempty("Travel type is required"),
    message: zod_1.z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message cannot exceed 1000 characters"),
});
//# sourceMappingURL=contactSchema.js.map