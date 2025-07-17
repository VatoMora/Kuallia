export interface Capsula {
  id?: number;
  titulo: string;
  contenido: string;
  tipo: 'ERROR' | 'EXITO';
}

export interface CapsulaResponse {
  id: number;
  titulo: string;
  contenido: string;
  tipo: 'ERROR' | 'EXITO';
}

export interface CapsulaRequest {
  titulo: string;
  contenido: string;
  tipo: 'ERROR' | 'EXITO';
}
