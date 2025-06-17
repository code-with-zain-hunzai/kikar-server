"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const api_types_1 = require("../types/api.types");
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(api_types_1.HttpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Authentication required",
                error: "No token provided"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "your-secret-key");
        const admin = await db_1.prisma.admin.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                role: true
            }
        });
        if (!admin) {
            return res.status(api_types_1.HttpStatus.UNAUTHORIZED).json({
                success: false,
                message: "User not found",
                error: "Invalid token"
            });
        }
        req.user = admin;
        next();
    }
    catch (error) {
        return res.status(api_types_1.HttpStatus.UNAUTHORIZED).json({
            success: false,
            message: "Invalid token",
            error: "Authentication failed"
        });
    }
};
exports.auth = auth;
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(api_types_1.HttpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Authentication required",
                error: "No user found"
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(api_types_1.HttpStatus.FORBIDDEN).json({
                success: false,
                message: "Access denied",
                error: "Insufficient permissions"
            });
        }
        next();
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=authMiddleware.js.map