import { Usuario } from './usuario.model';
import { Reto } from './reto.model';

export interface Respuesta {
  id?: number;
  usuario: Usuario;
  reto: Reto;
  opcionElegida: number;
  esCorrecta: boolean;
  fechaRespuesta: string;
}

export interface RespuestaResponse {
  id: number;
  usuario: Usuario;
  reto: Reto;
  opcionElegida: number;
  esCorrecta: boolean;
  fechaRespuesta: string;
}

export interface RespuestaRequest {
  usuarioId: number;
  retoId: number;
  opcionElegida: number;
}

export interface RespuestaRetoRequest {
  opcionElegida: number;
}

export interface RespuestaRetoResponse {
  esCorrecta: boolean;
  opcionCorrecta: number;
  retroalimentacion: string;
  respuestaId: number;
}

export interface HistorialRespuestas {
  respuestas: RespuestaResponse[];
  totalRespuestas: number;
  respuestasCorrectas: number;
  porcentajeAciertos: number;
}
