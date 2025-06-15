// src/app/core/services/error/error-handling.service.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  /**
  * Processes and displays an error message to the user.
  * @param error The HttpErrorResponse or Error error object.
  */
  handleError(error: HttpErrorResponse | Error): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erro de rede ou cliente: ${error.error.message}`;
      } else {
        if (error.status) {
          switch (error.status) {
            case 400:
              errorMessage = 'Requisição inválida: ' + (error.error?.message || 'Dados enviados inválidos.');
              break;
            case 401:
              errorMessage = 'Não autorizado: Você precisa fazer login.';
              break;
            case 403:
              errorMessage = 'Acesso negado: Você não tem permissão.';
              break;
            case 404:
              errorMessage = 'Recurso não encontrado: ' + (error.error?.message || 'O item solicitado não existe.');
              break;
            case 500:
              errorMessage = 'Erro interno do servidor: Tente novamente mais tarde.';
              break;
            default:
              errorMessage = `Erro do servidor (${error.status}): ${error.message}`;
          }
        } else {
          errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente.';
        }

        if (error.error && typeof error.error === 'object' && error.error.message) {
          errorMessage = `${errorMessage} Detalhes: ${error.error.message}`;
        }
      }
    } else if (error instanceof Error) {
      errorMessage = `Erro na aplicação: ${error.message}`;
    }

    console.error('Erro interceptado:', error);
    alert(`Erro na Aplicação:\n${errorMessage}`);
    return throwError(() => new Error(errorMessage));
  }
}
