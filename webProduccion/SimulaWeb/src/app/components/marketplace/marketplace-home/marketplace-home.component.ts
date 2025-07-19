import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MarketplaceService } from '../../../services/marketplace.service';
import { ProductoMarketplace, CategoriaMarketplace } from '../../../models/producto-marketplace.model';

@Component({
  selector: 'app-marketplace-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './marketplace-home.component.html',
  styleUrls: ['./marketplace-home.component.css']
})
export class MarketplaceHomeComponent implements OnInit {
  productos: ProductoMarketplace[] = [];
  productosFiltrados: ProductoMarketplace[] = [];
  categorias: CategoriaMarketplace[] = [];
  terminoBusqueda: string = '';
  categoriaSeleccionada: string = 'todas';
  ordenamiento: string = 'relevancia';
  carritoItems: number = 0;

  constructor(private marketplaceService: MarketplaceService) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
    this.suscribirseAlCarrito();
  }

  cargarProductos(): void {
    this.marketplaceService.getProductos().subscribe(productos => {
      this.productos = productos;
      this.productosFiltrados = productos;
    });
  }

  cargarCategorias(): void {
    this.marketplaceService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  suscribirseAlCarrito(): void {
    this.marketplaceService.carrito$.subscribe(items => {
      this.carritoItems = items.reduce((acc, item) => acc + item.cantidad, 0);
    });
  }

  buscarProductos(): void {
    if (this.terminoBusqueda.trim() !== '') {
      this.marketplaceService.buscarProductos(this.terminoBusqueda).subscribe(productos => {
        this.productosFiltrados = productos;
        if (this.categoriaSeleccionada !== 'todas') {
          this.productosFiltrados = this.productosFiltrados.filter(p => p.categoria === this.categoriaSeleccionada);
        }
      });
    } else {
      this.filtrarPorCategoria();
    }
  }

  filtrarPorCategoria(): void {
    if (this.categoriaSeleccionada === 'todas') {
      this.productosFiltrados = this.productos;
    } else {
      this.marketplaceService.getProductosByCategoria(this.categoriaSeleccionada).subscribe(productos => {
        this.productosFiltrados = productos;
      });
    }
  }

  ordenarProductos(): void {
    switch (this.ordenamiento) {
      case 'precio-menor':
        this.productosFiltrados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-mayor':
        this.productosFiltrados.sort((a, b) => b.precio - a.precio);
        break;
      case 'nombre':
        this.productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'descuento':
        this.productosFiltrados.sort((a, b) => (b.descuento || 0) - (a.descuento || 0));
        break;
      default:
        // Ordenamiento por relevancia (más recientes primero)
        this.productosFiltrados.sort((a, b) => 
          new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime()
        );
    }
  }

  agregarAlCarrito(producto: ProductoMarketplace, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.marketplaceService.agregarAlCarrito(producto);
  }

  calcularPrecioConDescuento(precio: number, descuento?: number): number {
    if (descuento) {
      return precio * (1 - descuento / 100);
    }
    return precio;
  }

  getIconoCategoria(categoria: CategoriaMarketplace): string {
    return categoria.icono;
  }
}
