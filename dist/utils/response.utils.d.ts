import { Response } from 'express';
/**
 * Send a successful JSON response
 */
export declare const sendSuccess: <T>(res: Response, data: T, message?: string, statusCode?: number) => void;
export { HttpStatus } from '../types/api.types';
/**
 * Send an error JSON response
 */
export declare const sendError: (res: Response, error: string, message?: string, statusCode?: number) => void;
