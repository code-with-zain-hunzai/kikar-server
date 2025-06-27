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
    console.log('Cookies:', req.cookies);
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required",
        error: "No token provided"
      } as ApiResponse);
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as JwtPayload;

    const { id, role } = decoded;
    let user = null;

    if (role === 'tourist') {
      user = await prisma.tourist.findUnique({ where: { id } });
    } else if (role === 'guide') {
      user = await prisma.guide.findUnique({ where: { id } });
    } else if (role === 'hotel') {
      user = await prisma.hotel.findUnique({ where: { id } });
    } else if (role === 'transporter') {
      user = await prisma.transporter.findUnique({ where: { id } });
    } else if (role === 'admin') {
      user = await prisma.admin.findUnique({ where: { id } });
    }

    if (!user) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "User not found",
        error: "Invalid token"
      } as ApiResponse);
      return;
    }

    req.user = { ...user, role };
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Invalid token",
      error: "Authentication failed"
    } as ApiResponse);
    return;
  }
};

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required",
        error: "No user found"
      } as ApiResponse);
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: "Access denied",
        error: "Insufficient permissions"
      } as ApiResponse);
      return;
    }

    next();
  };
};

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.adminAccessToken || req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required",
        error: "No token provided"
      } as ApiResponse);
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as JwtPayload;
    if (decoded.role !== 'admin') {
      res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: "Access denied",
        error: "Not an admin"
      } as ApiResponse);
      return;
    }
    const user = await prisma.admin.findUnique({ where: { id: decoded.id } });
    if (!user) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "User not found",
        error: "Invalid token"
      } as ApiResponse);
      return;
    }
    req.user = { ...user, role: decoded.role };
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Invalid token",
      error: "Authentication failed"
    } as ApiResponse);
    return;
  }
}; 
