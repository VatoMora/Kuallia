export interface Negocio {
  id: number;
  nombre: string;
  giro: string;
  fotoBase64?: string;
  fechaCreacion: string;
  usuarioId: number;
  usuarioNombre: string;
  productos?: Producto[];
}

export interface NegocioRequest {
  nombre: string;
  giro: string;
  fotoBase64?: string;
  usuarioId: number;
}

export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  costo: number;
  precio: number;
  unidades: number;
  negocioId: number;
}

export interface TiempoSimulacion {
  valor: number;
  unidad: 'dias' | 'meses' | 'años';
}
