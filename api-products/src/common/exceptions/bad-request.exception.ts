import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception to represent invalid request errors (HTTP 400 Bad Request).
 *
 * This exception should be thrown when the client's request cannot be processed
 * due to issues like invalid data, missing parameters, or incorrect format.
 * It extends NestJS's HttpException class, automatically returning
 * an HTTP 400 status and a standardized error body.
 *
 * @param message - Detailed error message. Optional, defaults to 'Invalid request'.
 * @example
 * // Example usage in a controller:
 * throw new BadRequestException('The "name" field is required.');
 *
 * @author [Uedney C Morais] <uedneymorais@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 */
/**
 * @const multerOptions
 * @description Multer FileInterceptor configuration options,
 * including disk storage and custom filename logic for images.
 * This configuration is reused for image uploads in both product creation and update operations.
 *
 * @property {object} storage - Defines how and where files will be stored.
 * @property {Function} storage.destination - Function that specifies the destination folder for files.
 * @property {Function} storage.filename - Function that generates the unique filename on disk.
 * @property {Function} fileFilter - Function that filters allowed files based on their mimetype or extension.
 *
 * @author [Uedney C Morais] <uedneymorais@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 */
export class BadRequestException extends HttpException {
  constructor(message = 'Requisição inválida') {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
