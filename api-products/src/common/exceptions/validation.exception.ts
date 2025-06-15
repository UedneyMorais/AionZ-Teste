import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception to represent validation errors (HTTP 422 Unprocessable Entity).
 *
 * This exception should be thrown when the client's request is syntactically correct,
 * but contains semantic errors that prevent the server from processing it (e.g., invalid data).
 * It extends NestJS's HttpException class, automatically returning
 * an HTTP 422 status and a standardized error body that includes the validation error messages.
 *
 * @param errors - A string or an array of strings containing the validation error messages.
 * @example
 * // Example usage in a custom ValidationPipe or a service:
 * const validationErrors = ['The "email" field is invalid.', 'The password is too short.'];
 * throw new ValidationException(validationErrors);
 *
 * @author [Uedney C Morais] <uedneymorais@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 */
export class ValidationException extends HttpException {
  constructor(errors: string[] | string) {
    super(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: errors,
        error: 'Validation Error',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
