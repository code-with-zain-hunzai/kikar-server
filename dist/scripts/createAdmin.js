"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
async function createAdmin() {
    try {
        const email = 'admin@example.com'; // Change this to your desired email
        const password = 'admin123'; // Change this to your desired password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const admin = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword,
                role: 'admin'
            }
        });
        console.log('Admin created successfully:', admin);
    }
    catch (error) {
        console.error('Error creating admin:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
createAdmin();
//# sourceMappingURL=createAdmin.js.map