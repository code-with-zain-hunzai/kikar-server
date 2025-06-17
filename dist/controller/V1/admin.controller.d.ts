import { Response } from 'express';
import { LoginAdminRequest } from '../../types/admin.types';
export declare const loginAdmin: (req: LoginAdminRequest, res: Response) => Promise<void>;
