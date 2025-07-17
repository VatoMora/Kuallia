import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          switch (error.status) {
            case 400:
              errorMessage = 'Solicitud incorrecta. Verifica los datos enviados.';
              break;
            case 401:
              errorMessage = 'No autorizado. Verifica tus credenciales.';
              break;
            case 403:
              errorMessage = 'Acceso denegado. No tienes permisos para esta acción.';
              break;
            case 404:
              errorMessage = 'Recurso no encontrado.';
              break;
            case 409:
              errorMessage = 'Conflicto. El recurso ya existe o hay un problema de duplicación.';
              break;
            case 500:
              errorMessage = 'Error interno del servidor. Intenta nuevamente más tarde.';
              break;
            case 503:
              errorMessage = 'Servicio no disponible. Intenta nuevamente más tarde.';
              break;
            default:
              errorMessage = `Error ${error.status}: ${error.message}`;
          }
        }

        // Log del error (opcional)
        console.error('HTTP Error:', error);
        
        return throwError(() => ({ 
          status: error.status, 
          message: errorMessage,
          originalError: error 
        }));
      })
    );
  }
}
