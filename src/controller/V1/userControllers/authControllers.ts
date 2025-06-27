import { Request, Response } from 'express';
import { sendSuccess } from '../../../utils/response.utils';

export const logout = (req: Request, res: Response) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  return sendSuccess(res, null, 'Logged out successfully');
}; 