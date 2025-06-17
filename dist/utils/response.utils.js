"use strict";
// src/utils/response.utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.HttpStatus = exports.sendSuccess = void 0;
const api_types_1 = require("../types/api.types");
/**
 * Send a successful JSON response
 */
const sendSuccess = (res, data, message = 'Success', statusCode = api_types_1.HttpStatus.OK) => {
    const response = {
        success: true,
        data,
        message,
    };
    res.status(statusCode).json(response);
};
exports.sendSuccess = sendSuccess;
// Re-export HttpStatus for external usage
var api_types_2 = require("../types/api.types");
Object.defineProperty(exports, "HttpStatus", { enumerable: true, get: function () { return api_types_2.HttpStatus; } });
/**
 * Send an error JSON response
 */
const sendError = (res, error, message = 'An error occurred', statusCode = api_types_1.HttpStatus.INTERNAL_SERVER_ERROR) => {
    const response = {
        success: false,
        error,
        message,
    };
    res.status(statusCode).json(response);
};
exports.sendError = sendError;
//# sourceMappingURL=response.utils.js.map