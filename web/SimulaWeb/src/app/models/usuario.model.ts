export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  password?: string;
  rol: 'ADMIN' | 'EMPRENDEDOR';
  saldo: number;
  nivel: number;
}

export interface UsuarioResponse {
  id: number;
  nombre: string;
  email: string;
  rol: 'ADMIN' | 'EMPRENDEDOR';
  saldo: number;
  nivel: number;
}

export interface UsuarioRequest {
  nombre: string;
  email: string;
  password: string;
  rol: 'ADMIN' | 'EMPRENDEDOR';
  saldo?: number;
  nivel?: number;
}

export interface UsuarioEstadisticas {
  totalUsuarios: number;
  emprendedores: number;
  administradores: number;
  nivelPromedio: number;
  saldoPromedio: number;
}
