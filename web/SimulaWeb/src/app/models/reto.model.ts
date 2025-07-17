export interface Reto {
  id?: number;
  titulo: string;
  descripcion: string;
  opcion1: string;
  opcion2: string;
  respuestaCorrecta: number;
  retroalimentacion: string;
}

export interface RetoResponse {
  id: number;
  titulo: string;
  descripcion: string;
  opcion1: string;
  opcion2: string;
  respuestaCorrecta: number;
  retroalimentacion: string;
}

export interface RetoRequest {
  titulo: string;
  descripcion: string;
  opcion1: string;
  opcion2: string;
  respuestaCorrecta: number;
  retroalimentacion: string;
}

export interface RetoEstadisticas {
  totalRetos: number;
  totalRespuestas: number;
  respuestasCorrectas: number;
  porcentajeAciertos: number;
  retoMasRespondido?: RetoResponse;
  retoMenosRespondido?: RetoResponse;
}

export interface RetoConRespuesta extends RetoResponse {
  yaRespondido: boolean;
  respuestaUsuario?: number;
  esCorrecta?: boolean;
}
