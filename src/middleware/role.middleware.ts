import { Response, NextFunction, RequestHandler } from 'express';
import { AuthRequest } from './auth.middleware';

export const authorizeRole = (roles: string[]): RequestHandler => {
  return (req, res, next) => {
    const user = (req as AuthRequest).user;
    if (!user || !roles.includes(user.role)) {
      res.sendStatus(403);
      return;
    }
    next();
  };
}; 