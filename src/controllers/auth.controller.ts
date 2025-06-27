import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/user.model';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  res.json({ token });
}; 