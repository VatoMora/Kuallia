import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar el usuario actual al header si está autenticado
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.id) {
      request = request.clone({
        setHeaders: {
          'X-User-Id': currentUser.id.toString(),
          'X-User-Role': currentUser.rol
        }
      });
    }

    return next.handle(request);
  }
}
