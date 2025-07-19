export interface PerfilUsuario {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  fotoBase64?: string;
  fechaNacimiento?: string;
  estado?: string;
  municipio?: string;
  rol: 'ADMIN' | 'EMPRENDEDOR';
  saldo: number;
  nivel: number;
}
