import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception to represent the resource not found error (HTTP 404 Not Found).
 *
 * This exception should be thrown when the server cannot find the requested resource,
 * but the request itself is valid and syntactically correct. It extends NestJS's HttpException class,
 * automatically returning an HTTP 404 status and a standardized error body.
 *
 * @param message - Detailed error message. Optional, defaults to 'Resource not found'.
 * @example
 * // Example usage in a service or controller when fetching an item that doesn't exist:
 * const product = await this.productRepository.findOne(id);
 * if (!product) {
 * throw new NotFoundException(`Product with ID ${id} not found.`);
 * }
 *
 * @author [Uedney C Morais] <uedneymorais@gmail.com>
 * @since 1.0.0
 * @version 1.0.0
 */
export class NotFoundException extends HttpException {
  constructor(message = 'Recurso não encontrado') {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
