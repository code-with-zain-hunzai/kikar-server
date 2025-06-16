import { Request } from 'express';

export interface LoginAdminRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}