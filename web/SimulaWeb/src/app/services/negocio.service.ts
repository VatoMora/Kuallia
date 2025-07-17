import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Negocio, NegocioRequest } from '../models/negocio.model';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  private readonly baseUrl = 'http://localhost:8080/api/negocios';

  constructor(private http: HttpClient) { }

  // Crear negocio
  crearNegocio(negocio: NegocioRequest): Observable<Negocio> {
    return this.http.post<Negocio>(this.baseUrl, negocio);
  }

  // Listar negocios por usuario
  listarPorUsuario(usuarioId: number): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.baseUrl}/usuario/${usuarioId}`);
  }

  // Listar negocios por usuario con productos
  listarPorUsuarioConProductos(usuarioId: number): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.baseUrl}/usuario/${usuarioId}/productos`);
  }

  // Buscar negocio por ID
  buscarPorId(id: number): Observable<Negocio> {
    return this.http.get<Negocio>(`${this.baseUrl}/${id}`);
  }

  // Buscar negocio por ID con productos
  buscarPorIdConProductos(id: number): Observable<Negocio> {
    return this.http.get<Negocio>(`${this.baseUrl}/${id}/productos`);
  }

  // Actualizar negocio
  actualizar(id: number, negocio: NegocioRequest): Observable<Negocio> {
    return this.http.put<Negocio>(`${this.baseUrl}/${id}`, negocio);
  }

  // Eliminar negocio
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Buscar por giro
  buscarPorGiro(giro: string): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.baseUrl}/buscar/giro?giro=${giro}`);
  }

  // Buscar por nombre
  buscarPorNombre(nombre: string): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.baseUrl}/buscar/nombre?nombre=${nombre}`);
  }
}
