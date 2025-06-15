import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../services/error/error-handling.service'; // Ajuste o caminho

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorHandlingService: ErrorHandlingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandlingService.handleError(error);
      })
    );
  }
}
