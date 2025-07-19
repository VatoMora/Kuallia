import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reto, RetoRequest, RetoResponse, RetoEstadisticas } from '../models';
import { RespuestaRetoRequest, RespuestaRetoResponse, RespuestaResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RetoService {
  //private readonly baseUrl = 'http://localhost:8080/api/retos';
  private readonly baseUrl = 'http://ec2-3-15-207-129.us-east-2.compute.amazonaws.com:8080/api/retos';

  constructor(private http: HttpClient) { }

  // Obtener todos los retos
  getRetos(): Observable<RetoResponse[]> {
    return this.http.get<RetoResponse[]>(this.baseUrl);
  }

  // Obtener reto por ID
  getReto(id: number): Observable<RetoResponse> {
    return this.http.get<RetoResponse>(`${this.baseUrl}/${id}`);
  }

  // Crear reto
  createReto(reto: RetoRequest): Observable<RetoResponse> {
    return this.http.post<RetoResponse>(this.baseUrl, reto);
  }

  // Actualizar reto
  updateReto(id: number, reto: RetoRequest): Observable<RetoResponse> {
    return this.http.put<RetoResponse>(`${this.baseUrl}/${id}`, reto);
  }

  // Eliminar reto
  deleteReto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Buscar retos por título
  buscarRetos(titulo: string): Observable<RetoResponse[]> {
    const params = new HttpParams().set('titulo', titulo);
    return this.http.get<RetoResponse[]>(`${this.baseUrl}/buscar`, { params });
  }

  // Responder a un reto
  responderReto(retoId: number, usuarioId: number, respuesta: RespuestaRetoRequest): Observable<RespuestaRetoResponse> {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.post<RespuestaRetoResponse>(`${this.baseUrl}/${retoId}/responder`, respuesta, { params });
  }

  // Obtener respuestas de un reto
  getRespuestasReto(retoId: number): Observable<RespuestaResponse[]> {
    return this.http.get<RespuestaResponse[]>(`${this.baseUrl}/${retoId}/respuestas`);
  }

  // Obtener estadísticas de retos
  getEstadisticas(): Observable<RetoEstadisticas> {
    return this.http.get<RetoEstadisticas>(`${this.baseUrl}/estadisticas`);
  }

  // Verificar si un usuario ya respondió un reto
  verificarRespuesta(retoId: number, usuarioId: number): Observable<boolean> {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.get<boolean>(`${this.baseUrl}/${retoId}/verificar-respuesta`, { params });
  }
}
