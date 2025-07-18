import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MarketplaceService } from '../../../services/marketplace.service';
import { ProductoMarketplace } from '../../../models/producto-marketplace.model';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto: ProductoMarketplace | undefined;
  cantidad: number = 1;
  productosRelacionados: ProductoMarketplace[] = [];
  imagenActiva: number = 0;

  constructor(
    private route: ActivatedRoute,
    private marketplaceService: MarketplaceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.cargarProducto(id);
    });
  }

  cargarProducto(id: string): void {
    this.marketplaceService.getProductoById(id).subscribe(producto => {
      this.producto = producto;
      if (producto) {
        this.cargarProductosRelacionados(producto.categoria);
      }
    });
  }

  cargarProductosRelacionados(categoria: string): void {
    this.marketplaceService.getProductosByCategoria(categoria).subscribe(productos => {
      this.productosRelacionados = productos.filter(p => p.id !== this.producto?.id).slice(0, 4);
    });
  }

  aumentarCantidad(): void {
    if (this.producto && this.cantidad < this.producto.stock) {
      this.cantidad++;
    }
  }

  disminuirCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  agregarAlCarrito(): void {
    if (this.producto) {
      this.marketplaceService.agregarAlCarrito(this.producto, this.cantidad);
    }
  }

  calcularPrecioConDescuento(precio: number, descuento?: number): number {
    if (descuento) {
      return precio * (1 - descuento / 100);
    }
    return precio;
  }

  calcularAhorro(): number {
    if (this.producto && this.producto.descuento) {
      return this.producto.precio * (this.producto.descuento / 100);
    }
    return 0;
  }
}
