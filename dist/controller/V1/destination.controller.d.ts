import { Request, Response } from "express";
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}
export declare const createDestination: (req: MulterRequest, res: Response) => Promise<void>;
export declare const updateDestination: (req: MulterRequest, res: Response) => Promise<void>;
export declare const getAllDestinations: (_req: Request, res: Response) => Promise<void>;
export declare const getDestinationById: (req: Request, res: Response) => Promise<void>;
export declare const deleteDestination: (req: Request, res: Response) => Promise<void>;
export {};
