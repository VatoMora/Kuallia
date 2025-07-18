export interface ProductoMarketplace {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  vendedor: {
    id: string;
    nombre: string;
    tipoNegocio: string;
    calificacion: number;
    ubicacion: string;
  };
  stock: number;
  caracteristicas: string[];
  fechaPublicacion: Date;
  estadoProducto: 'nuevo' | 'usado' | 'reacondicionado';
  envioDisponible: boolean;
  tiempoEntrega: string;
  descuento?: number;
  etiquetas: string[];
}

export interface CategoriaMarketplace {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
  productosCantidad: number;
}

export interface CarritoItem {
  producto: ProductoMarketplace;
  cantidad: number;
  subtotal: number;
}

export interface OrdenCompra {
  id: string;
  items: CarritoItem[];
  total: number;
  fecha: Date;
  estado: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';
  direccionEnvio: string;
  metodoPago: string;
}
