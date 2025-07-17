import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'ADMIN' | 'EMPRENDEDOR';
  saldo: number;
  nivel: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;

  constructor(private http: HttpClient) {
    // Cargar usuario desde localStorage al inicializar
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<Usuario> {
    // Intentar primero con endpoint de login si existe
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios/login`, { email, password })
      .pipe(
        map(user => {
          // Guardar usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          // Si no existe el endpoint de login, simular con búsqueda por email
          return this.simulateLogin(email, password);
        })
      );
  }

  private simulateLogin(email: string, password: string): Observable<Usuario> {
    // Obtener todos los usuarios y buscar por email
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`)
      .pipe(
        map(usuarios => {
          const user = usuarios.find(u => u.email === email);
          if (!user) {
            throw new Error('Usuario no encontrado');
          }
          
          // En un sistema real, la contraseña estaría hasheada
          // Por simplicidad, comparamos directamente
          if (user.password !== password) {
            throw new Error('Contraseña incorrecta');
          }

          // Remover la contraseña del objeto antes de guardarlo
          const { password: _, ...userWithoutPassword } = user;
          const authenticatedUser = userWithoutPassword as Usuario;
          
          // Guardar usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
          this.currentUserSubject.next(authenticatedUser);
          return authenticatedUser;
        }),
        catchError(error => {
          console.error('Error en login:', error);
          throw new Error('Error de autenticación');
        })
      );
  }

  logout(): void {
    // Remover usuario de localStorage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.rol === 'ADMIN';
  }

  isEmprendedor(): boolean {
    return this.currentUserValue?.rol === 'EMPRENDEDOR';
  }

  getUserInitials(): string {
    if (!this.currentUserValue) return '';
    return this.currentUserValue.nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }
}
