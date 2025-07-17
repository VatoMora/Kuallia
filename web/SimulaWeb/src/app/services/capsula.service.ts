import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Capsula, CapsulaRequest, CapsulaResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CapsulaService {
  private readonly baseUrl = 'http://localhost:8080/api/capsulas';

  constructor(private http: HttpClient) { }

  // Obtener todas las cápsulas
  getCapsulas(): Observable<CapsulaResponse[]> {
    return this.http.get<CapsulaResponse[]>(this.baseUrl);
  }

  // Obtener cápsula por ID
  getCapsula(id: number): Observable<CapsulaResponse> {
    return this.http.get<CapsulaResponse>(`${this.baseUrl}/${id}`);
  }

  // Crear cápsula
  createCapsula(capsula: CapsulaRequest): Observable<CapsulaResponse> {
    return this.http.post<CapsulaResponse>(this.baseUrl, capsula);
  }

  // Actualizar cápsula
  updateCapsula(id: number, capsula: CapsulaRequest): Observable<CapsulaResponse> {
    return this.http.put<CapsulaResponse>(`${this.baseUrl}/${id}`, capsula);
  }

  // Eliminar cápsula
  deleteCapsula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Obtener cápsulas por tipo
  getCapsulasPorTipo(tipo: 'ERROR' | 'EXITO'): Observable<CapsulaResponse[]> {
    const params = new HttpParams().set('tipo', tipo);
    return this.http.get<CapsulaResponse[]>(`${this.baseUrl}/tipo`, { params });
  }

  // Buscar cápsulas por título
  buscarCapsulas(titulo: string): Observable<CapsulaResponse[]> {
    const params = new HttpParams().set('titulo', titulo);
    return this.http.get<CapsulaResponse[]>(`${this.baseUrl}/buscar`, { params });
  }

  // Obtener cápsulas de éxito
  getCapsulaExito(): Observable<CapsulaResponse[]> {
    return this.getCapsulasPorTipo('EXITO');
  }

  // Obtener cápsulas de error
  getCapsulaError(): Observable<CapsulaResponse[]> {
    return this.getCapsulasPorTipo('ERROR');
  }
}
