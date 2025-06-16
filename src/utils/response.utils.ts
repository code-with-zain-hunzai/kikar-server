// src/utils/response.utils.ts

import { Response } from 'express';
import { ApiResponse, HttpStatus } from '../types/api.types'

/**
 * Send a successful JSON response
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = HttpStatus.OK
): void => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  res.status(statusCode).json(response);
};

// Re-export HttpStatus for external usage
export { HttpStatus } from '../types/api.types';

/**
 * Send an error JSON response
 */
export const sendError = (
  res: Response,
  error: string,
  message: string = 'An error occurred',
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
): void => {
  const response: ApiResponse = {
    success: false,
    error,
    message,
  };
  res.status(statusCode).json(response);
};