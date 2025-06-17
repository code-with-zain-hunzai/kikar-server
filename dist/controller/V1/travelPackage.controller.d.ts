import { Request, Response } from 'express';
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}
export declare const getAllTravelPackages: (_req: Request, res: Response) => Promise<void>;
export declare const getTravelPackageById: (req: Request, res: Response) => Promise<void>;
export declare const createTravelPackage: (req: MulterRequest, res: Response) => Promise<void>;
export declare const updateTravelPackage: (req: MulterRequest, res: Response) => Promise<void>;
export declare const deleteTravelPackage: (req: Request, res: Response) => Promise<void>;
export {};
