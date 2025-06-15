import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception to represent internal server errors (HTTP 500 Internal Server Error).
 *
 * This exception should be thrown when an unexpected condition or a generic error
 * prevents the server from fulfilling the request. It extends NestJS's HttpException class,
 * automatically returning an HTTP 500 status and a standardized error body.
 *
 * @param message - Detailed error message. Optional, defaults to 'An internal server error occurred.'.
 * @example
 * // Example usage in a service, controller, or interceptor:
 * throw new InternalServerError('Failed to connect to the products database.');
 *
 * @author [Uedney C Morais] <uedneymorais@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 */
export class InternalServerError extends HttpException {
  constructor(message = 'Ocorreu um erro interno no servidor.') {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        message: message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
