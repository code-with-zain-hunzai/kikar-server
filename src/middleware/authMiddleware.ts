import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
import { HttpStatus, ApiResponse } from "../types/api.types";

interface JwtPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required",
        error: "No token provided"
      } as ApiResponse);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as JwtPayload;

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        role: true
      }
    });

    if (!admin) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "User not found",
        error: "Invalid token"
      } as ApiResponse);
    }

    req.user = admin;
    next();
  } catch (error) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Invalid token",
      error: "Authentication failed"
    } as ApiResponse);
  }
};

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required",
        error: "No user found"
      } as ApiResponse);
    }

    if (!roles.includes(req.user.role)) {
      return res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: "Access denied",
        error: "Insufficient permissions"
      } as ApiResponse);
    }

    next();
  };
}; 
