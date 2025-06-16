import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const errorHandlingService = this.injector.get(ErrorHandlingService);

    if (error instanceof HttpErrorResponse) {
      console.warn('GlobalErrorHandler: HTTP error caught (may be duplicate of Interceptor):', error);
    } else {
      console.error('GlobalErrorHandler: An application error occurred:', error);
      errorHandlingService.handleError(error);
    }
  }
}
