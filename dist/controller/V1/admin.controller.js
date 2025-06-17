"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = void 0;
const db_1 = require("../../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../../config/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const api_types_1 = require("../../types/api.types");
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email });
    try {
        const admin = await db_1.prisma.admin.findUnique({
            where: { email }
        });
        console.log('Admin found:', admin ? 'Yes' : 'No');
        if (!admin) {
            console.log('Error: Admin not found');
            res.status(api_types_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Invalid credentials',
                error: 'Invalid credentials'
            });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, admin.password);
        console.log('Password match:', isMatch ? 'Yes' : 'No');
        if (!isMatch) {
            console.log('Error: Password does not match');
            res.status(api_types_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Invalid credentials',
                error: 'Invalid credentials'
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: admin.id }, jwt_1.JWT_SECRET, { expiresIn: '1d' });
        console.log('Login successful, token generated');
        res.status(api_types_1.HttpStatus.OK).json({
            success: true,
            message: 'Login successful',
            data: {
                accessToken: token,
                user: {
                    id: admin.id,
                    email: admin.email,
                    role: admin.role
                }
            }
        });
    }
    catch (err) {
        console.error('Server error during login:', err);
        res.status(api_types_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Server error',
            error: 'Internal server error'
        });
    }
};
exports.loginAdmin = loginAdmin;
//# sourceMappingURL=admin.controller.js.map