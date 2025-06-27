import express, { Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/role.middleware';

const router = express.Router();

router.get(
  '/dashboard',
  authenticateToken,
  authorizeRole(['admin']),
  (req: AuthRequest, res: Response) => {
    res.send('Welcome to the Admin Dashboard!');
  }
);

router.get(
  '/feed',
  authenticateToken,
  authorizeRole(['user']),
  (req: AuthRequest, res: Response) => {
    res.send('Welcome to your User Feed!');
  }
);

export default router; 