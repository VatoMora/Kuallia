import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuarioRequest, UsuarioResponse, UsuarioEstadisticas } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //private readonly baseUrl = 'http://localhost:8080/api/usuarios';
  private readonly baseUrl = 'http://ec2-3-15-207-129.us-east-2.compute.amazonaws.com:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.baseUrl);
  }

  // Obtener usuario por ID
  getUsuario(id: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.baseUrl}/${id}`);
  }

  // Crear usuario
  createUsuario(usuario: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.baseUrl, usuario);
  }

  // Actualizar usuario
  updateUsuario(id: number, usuario: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.baseUrl}/${id}`, usuario);
  }

  // Eliminar usuario
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Buscar usuario por email
  getUsuarioPorEmail(email: string): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.baseUrl}/email/${email}`);
  }

  // Obtener usuarios por rol
  getUsuariosPorRol(rol: string): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.baseUrl}/rol/${rol}`);
  }

  // Obtener estadísticas de usuarios
  getEstadisticas(): Observable<UsuarioEstadisticas> {
    return this.http.get<UsuarioEstadisticas>(`${this.baseUrl}/estadisticas`);
  }

  // Actualizar saldo de usuario
  actualizarSaldo(id: number, nuevoSaldo: number): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.baseUrl}/${id}/saldo`, { saldo: nuevoSaldo });
  }

  // Actualizar nivel de usuario
  actualizarNivel(id: number, nuevoNivel: number): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.baseUrl}/${id}/nivel`, { nivel: nuevoNivel });
  }
}
