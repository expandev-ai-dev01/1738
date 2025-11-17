/**
 * @summary
 * Creates standardized success response object
 *
 * @function successResponse
 * @module middleware
 *
 * @param {any} data - Response data
 * @param {any} [metadata] - Optional metadata
 *
 * @returns {object} Standardized success response
 */
export function successResponse(data: any, metadata?: any): object {
  return {
    success: true,
    data,
    metadata: metadata || { timestamp: new Date().toISOString() },
  };
}

/**
 * @summary
 * Creates standardized error response object
 *
 * @function errorResponse
 * @module middleware
 *
 * @param {string} message - Error message
 * @param {string} [code] - Error code
 *
 * @returns {object} Standardized error response
 */
export function errorResponse(message: string, code?: string): object {
  return {
    success: false,
    error: {
      code: code || 'ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
  };
}
