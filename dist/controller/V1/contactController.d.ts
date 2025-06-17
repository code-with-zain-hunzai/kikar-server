import { Request, Response } from "express";
import { ApiResponse } from "../../types/api.types";
export declare const submitContactForm: (req: Request, res: Response<ApiResponse>) => Promise<void>;
export declare const getAllContacts: (req: Request, res: Response<ApiResponse>) => Promise<void>;
