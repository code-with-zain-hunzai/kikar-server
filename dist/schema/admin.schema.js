"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminSchema = void 0;
const zod_1 = require("zod");
exports.loginAdminSchema = zod_1.z.object({
    email: zod_1.z.string().email('Please enter a valid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
//# sourceMappingURL=admin.schema.js.map