// src/app/core/services/error/global-error-handler.service.ts
import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service'; // Reutilize seu serviço de tratamento de erros

@Injectable() // Não use providedIn: 'root' para ErrorHandler customizado
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { } // Use Injector para evitar dependência circular

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
