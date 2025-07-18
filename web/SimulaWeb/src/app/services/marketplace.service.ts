import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProductoMarketplace, CategoriaMarketplace, CarritoItem } from '../models/producto-marketplace.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  private carritoSubject = new BehaviorSubject<CarritoItem[]>([]);
  public carrito$ = this.carritoSubject.asObservable();

  private productos: ProductoMarketplace[] = [
    // Productos de Papelería
    {
      id: '1',
      nombre: 'Kit Escolar Premium',
      descripcion: 'Kit completo con cuadernos, lápices, plumas, colores y más. Ideal para estudiantes.',
      precio: 299.99,
      categoria: 'papeleria',
      imagen: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400',
      vendedor: {
        id: 'v1',
        nombre: 'Papelería El Estudiante',
        tipoNegocio: 'Papelería',
        calificacion: 4.8,
        ubicacion: 'Centro, CDMX'
      },
      stock: 25,
      caracteristicas: ['10 cuadernos profesionales', '12 lápices HB', '6 plumas de colores', 'Estuche incluido'],
      fechaPublicacion: new Date('2024-01-15'),
      estadoProducto: 'nuevo',
      envioDisponible: true,
      tiempoEntrega: '2-3 días',
      descuento: 15,
      etiquetas: ['escolar', 'estudiantes', 'oferta']
    },
    {
      id: '2',
      nombre: 'Papel Bond A4 - 500 hojas',
      descripcion: 'Papel bond de alta calidad, ideal para impresiones y copias.',
      precio: 89.50,
      categoria: 'papeleria',
      imagen: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400',
      vendedor: {
        id: 'v1',
        nombre: 'Papelería El Estudiante',
        tipoNegocio: 'Papelería',
        calificacion: 4.8,
        ubicacion: 'Centro, CDMX'
      },
      stock: 100,
      caracteristicas: ['Gramaje 75g/m²', 'Blancura 95%', 'Tamaño carta'],
      fechaPublicacion: new Date('2024-01-20'),
      estadoProducto: 'nuevo',
      envioDisponible: true,
      tiempoEntrega: '1-2 días',
      etiquetas: ['oficina', 'papel', 'impresión']
    },

    // Productos de Peluquería
    {
      id: '3',
      nombre: 'Kit Profesional de Corte',
      descripcion: 'Set completo de tijeras profesionales, peines y accesorios para estilistas.',
      precio: 1599.99,
      categoria: 'peluqueria',
      imagen: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
      vendedor: {
        id: 'v2',
        nombre: 'Beauty Pro Supplies',
        tipoNegocio: 'Peluquería',
        calificacion: 4.9,
        ubicacion: 'Polanco, CDMX'
      },
      stock: 10,
      caracteristicas: ['Tijeras de acero japonés', '6 peines profesionales', 'Capa de corte', 'Estuche de cuero'],
      fechaPublicacion: new Date('2024-01-10'),
      estadoProducto: 'nuevo',
      envioDisponible: true,
      tiempoEntrega: '3-5 días',
      descuento: 20,
      etiquetas: ['profesional', 'estilista', 'premium']
    },
    {
      id: '4',
      nombre: 'Secadora Profesional 2000W',
      descripcion: 'Secadora de pelo profesional con tecnología iónica y 3 niveles de temperatura.',
      precio: 899.00,
      categoria: 'peluqueria',
      imagen: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400',
      vendedor: {
        id: 'v2',
        nombre: 'Beauty Pro Supplies',
        tipoNegocio: 'Peluquería',
        calificacion: 4.9,
        ubicacion: 'Polanco, CDMX'
      },
      stock: 15,
      caracteristicas: ['Motor AC profesional', 'Tecnología iónica', '2 velocidades', 'Botón de aire frío'],
      fechaPublicacion: new Date('2024-01-18'),
      estadoProducto: 'nuevo',
      envioDisponible: true,
      tiempoEntrega: '2-4 días',
      etiquetas: ['secadora', 'profesional', 'salón']
    },

    // Productos de Cafetería
    {
      id: '5',
      nombre: 'Cafetera Espresso Comercial',
      descripcion: 'Máquina de espresso semi-automática perfecta para cafeterías pequeñas y medianas.',
      precio: 8999.99,
      categoria: 'cafeteria',
      imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      vendedor: {
        id: 'v3',
        nombre: 'Café Supplies MX',
        tipoNegocio: 'Cafetería',
        calificacion: 4.7,
        ubicacion: 'Roma Norte, CDMX'
      },
      stock: 5,
      caracteristicas: ['2 grupos', 'Vaporizador profesional', 'Presión 9 bares', 'Tanque 10L'],
      fechaPublicacion: new Date('2024-01-05'),
      estadoProducto: 'nuevo',
      envioDisponible: false,
      tiempoEntrega: 'Instalación incluida',
      descuento: 10,
      etiquetas: ['espresso', 'comercial', 'profesional']
    },
    {
      id: '6',
      nombre: 'Café Gourmet en Grano 1kg',
      descripcion: 'Mezcla especial de café arábica de Chiapas y Veracruz, tostado medio.',
      precio: 299.00,
      categoria: 'cafeteria',
      imagen: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
      vendedor: {
        id: 'v3',
        nombre: 'Café Supplies MX',
        tipoNegocio: 'Cafetería',
        calificacion: 4.7,
        ubicacion: 'Roma Norte, CDMX'
      },
      stock: 50,
      caracteristicas: ['100% Arábica', 'Tostado medio', 'Notas de chocolate', 'Origen: México'],
      fechaPublicacion: new Date('2024-01-22'),
      estadoProducto: 'nuevo',
      envioDisponible: true,
      tiempoEntrega: '1-3 días',
      etiquetas: ['café', 'gourmet', 'mexicano']
    },

    // Productos de Ferretería
    {
      id: '7',
      nombre: 'Taladro Inalámbrico 20V',
      descripcion: 'Taladro percutor inalámbrico con 2 baterías y maletín de accesorios.',
      precio: 1499.99,
      categoria: 'ferreteria',
      imagen: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
      vendedor: {
        id: 'v4',
        nombre: 'Ferretería Industrial',
        tipoNegocio: 'Ferretería',
        calificacion: 4.6,
        ubicacion: 'Naucalpan, EdoMex'
      },
      stock: 20,
      caracteristicas: ['20V Max', '2 baterías incluidas', '30 accesorios', 'Luz LED integrada'],
      fechaPublicacion: new Date('2024-01-12'),
      estadoProducto: 'nuevo',
      envioDisponible: true,
      tiempoEntrega: '2-4 días',
      descuento: 25,
      etiquetas: ['herramienta', 'construcción', 'oferta']
    },
    {
      id: '8',
      nombre: 'Set de Llaves Combinadas',
      descripcion: 'Juego de 12 llaves combinadas de acero cromo-vanadio, medidas de 8mm a 19mm.',
      precio: 599.00,
      categoria: 'ferreteria',
      imagen: 'https://images.unsplash.com/photo-1609205807107-454f1c68bc96?w=400',
      vendedor: {
        id: 'v4',
        nombre: 'Ferretería Industrial',
        tipoNegocio: 'Ferretería',
        calificacion: 4.6,
        ubicacion: 'Naucalpan, EdoMex'
      },
      stock: 35,
      caracteristicas: ['Acero cromo-vanadio', '12 piezas', 'Estuche incluido', 'Garantía de por vida'],
      fechaPublicacion: new Date('2024-01-19'),
      estadoProducto: 'nuevo',
      envioDisponible: true,
      tiempoEntrega: '1-3 días',
      etiquetas: ['herramientas', 'mecánica', 'profesional']
    },

    // Productos de Floristería
    {
      id: '9',
      nombre: 'Arreglo Floral Premium',
      descripcion: 'Hermoso arreglo con rosas, lilies y flores de temporada en base de cerámica.',
      precio: 899.99,
      categoria: 'floristeria',
      imagen: 'https://images.unsplash.com/photo-1567696911980-2c669aad3e50?w=400',
      vendedor: {
        id: 'v5',
        nombre: 'Flores del Valle',
        tipoNegocio: 'Floristería',
        calificacion: 4.9,
        ubicacion: 'Coyoacán, CDMX'
      },
      stock: 8,
      caracteristicas: ['25-30 flores', 'Base de cerámica incluida', 'Tarjeta personalizada', 'Duración 7-10 días'],
      fechaPublicacion: new Date('2024-01-21'),
      estadoProducto: 'nuevo',
      envioDisponible: true,
      tiempoEntrega: 'Mismo día',
      etiquetas: ['regalo', 'premium', 'aniversario']
    },
    {
      id: '10',
      nombre: 'Kit de Jardinería Interior',
      descripcion: 'Todo lo necesario para crear tu propio jardín de suculentas en casa.',
      precio: 349.00,
      categoria: 'floristeria',
      imagen: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
      vendedor: {
        id: 'v5',
        nombre: 'Flores del Valle',
        tipoNegocio: 'Floristería',
        calificacion: 4.9,
        ubicacion: 'Coyoacán, CDMX'
      },
      stock: 25,
      caracteristicas: ['5 suculentas variadas', '5 macetas decorativas', 'Tierra especial', 'Guía de cuidados'],
      fechaPublicacion: new Date('2024-01-16'),
      estadoProducto: 'nuevo',
      envioDisponible: true,
      tiempoEntrega: '2-3 días',
      descuento: 10,
      etiquetas: ['plantas', 'decoración', 'hogar']
    }
  ];

  private categorias: CategoriaMarketplace[] = [
    {
      id: 'papeleria',
      nombre: 'Papelería',
      icono: 'edit',
      descripcion: 'Artículos escolares y de oficina',
      productosCantidad: 2
    },
    {
      id: 'peluqueria',
      nombre: 'Peluquería',
      icono: 'content_cut',
      descripcion: 'Productos y herramientas para estilistas',
      productosCantidad: 2
    },
    {
      id: 'cafeteria',
      nombre: 'Cafetería',
      icono: 'local_cafe',
      descripcion: 'Equipos e insumos para cafeterías',
      productosCantidad: 2
    },
    {
      id: 'ferreteria',
      nombre: 'Ferretería',
      icono: 'build',
      descripcion: 'Herramientas y materiales de construcción',
      productosCantidad: 2
    },
    {
      id: 'floristeria',
      nombre: 'Floristería',
      icono: 'local_florist',
      descripcion: 'Flores, plantas y arreglos',
      productosCantidad: 2
    }
  ];

  constructor() { }

  getProductos(): Observable<ProductoMarketplace[]> {
    return of(this.productos);
  }

  getProductoById(id: string): Observable<ProductoMarketplace | undefined> {
    return of(this.productos.find(p => p.id === id));
  }

  getProductosByCategoria(categoria: string): Observable<ProductoMarketplace[]> {
    return of(this.productos.filter(p => p.categoria === categoria));
  }

  getCategorias(): Observable<CategoriaMarketplace[]> {
    return of(this.categorias);
  }

  buscarProductos(termino: string): Observable<ProductoMarketplace[]> {
    const terminoLower = termino.toLowerCase();
    return of(this.productos.filter(p => 
      p.nombre.toLowerCase().includes(terminoLower) ||
      p.descripcion.toLowerCase().includes(terminoLower) ||
      p.etiquetas.some(e => e.toLowerCase().includes(terminoLower))
    ));
  }

  agregarAlCarrito(producto: ProductoMarketplace, cantidad: number = 1): void {
    const carritoActual = this.carritoSubject.value;
    const itemExistente = carritoActual.find(item => item.producto.id === producto.id);

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
      itemExistente.subtotal = itemExistente.cantidad * itemExistente.producto.precio;
    } else {
      carritoActual.push({
        producto,
        cantidad,
        subtotal: producto.precio * cantidad
      });
    }

    this.carritoSubject.next([...carritoActual]);
  }

  quitarDelCarrito(productoId: string): void {
    const carritoActual = this.carritoSubject.value;
    const carritoFiltrado = carritoActual.filter(item => item.producto.id !== productoId);
    this.carritoSubject.next(carritoFiltrado);
  }

  vaciarCarrito(): void {
    this.carritoSubject.next([]);
  }

  getCarritoTotal(): Observable<number> {
    return new Observable(observer => {
      this.carrito$.subscribe(items => {
        const total = items.reduce((acc, item) => acc + item.subtotal, 0);
        observer.next(total);
      });
    });
  }
}
