/**
 * @summary
 * Standard general error object for unexpected errors
 *
 * @constant StatusGeneralError
 * @module middleware
 */
export const StatusGeneralError = {
  statusCode: 500,
  code: 'GENERAL_ERROR',
  message: 'An unexpected error occurred',
};
