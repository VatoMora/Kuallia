import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaResponse, RespuestaRequest, HistorialRespuestas } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private readonly baseUrl = 'http://localhost:8080/api/respuestas';

  constructor(private http: HttpClient) { }

  // Obtener todas las respuestas
  getRespuestas(): Observable<RespuestaResponse[]> {
    return this.http.get<RespuestaResponse[]>(this.baseUrl);
  }

  // Obtener respuesta por ID
  getRespuesta(id: number): Observable<RespuestaResponse> {
    return this.http.get<RespuestaResponse>(`${this.baseUrl}/${id}`);
  }

  // Crear respuesta
  createRespuesta(respuesta: RespuestaRequest): Observable<RespuestaResponse> {
    return this.http.post<RespuestaResponse>(this.baseUrl, respuesta);
  }

  // Actualizar respuesta
  updateRespuesta(id: number, respuesta: RespuestaRequest): Observable<RespuestaResponse> {
    return this.http.put<RespuestaResponse>(`${this.baseUrl}/${id}`, respuesta);
  }

  // Eliminar respuesta
  deleteRespuesta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Obtener respuestas por usuario
  getRespuestasPorUsuario(usuarioId: number): Observable<RespuestaResponse[]> {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.get<RespuestaResponse[]>(`${this.baseUrl}/usuario`, { params });
  }

  // Obtener respuestas por reto
  getRespuestasPorReto(retoId: number): Observable<RespuestaResponse[]> {
    const params = new HttpParams().set('retoId', retoId.toString());
    return this.http.get<RespuestaResponse[]>(`${this.baseUrl}/reto`, { params });
  }

  // Obtener historial de respuestas de un usuario
  getHistorialUsuario(usuarioId: number): Observable<HistorialRespuestas> {
    return this.http.get<HistorialRespuestas>(`${this.baseUrl}/usuario/${usuarioId}/historial`);
  }

  // Obtener respuestas correctas de un usuario
  getRespuestasCorrectas(usuarioId: number): Observable<RespuestaResponse[]> {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.get<RespuestaResponse[]>(`${this.baseUrl}/correctas`, { params });
  }

  // Obtener respuestas incorrectas de un usuario
  getRespuestasIncorrectas(usuarioId: number): Observable<RespuestaResponse[]> {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.get<RespuestaResponse[]>(`${this.baseUrl}/incorrectas`, { params });
  }

  // Obtener estadísticas de respuestas
  getEstadisticas(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/estadisticas`);
  }
}
