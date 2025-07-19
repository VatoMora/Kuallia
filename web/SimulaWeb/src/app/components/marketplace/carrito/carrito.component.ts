import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarketplaceService } from '../../../services/marketplace.service';
import { CarritoItem } from '../../../models/producto-marketplace.model';
import { ModalPagoComponent } from '../modal-pago/modal-pago.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalPagoComponent],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carritoItems: CarritoItem[] = [];
  total: number = 0;
  mostrarModalPago = false;

  constructor(private marketplaceService: MarketplaceService) { }

  ngOnInit(): void {
    this.suscribirseAlCarrito();
  }

  suscribirseAlCarrito(): void {
    this.marketplaceService.carrito$.subscribe(items => {
      this.carritoItems = items;
      this.calcularTotal();
    });
  }

  calcularTotal(): void {
    this.total = this.carritoItems.reduce((acc, item) => acc + item.subtotal, 0);
  }

  aumentarCantidad(item: CarritoItem): void {
    this.marketplaceService.agregarAlCarrito(item.producto, 1);
  }

  disminuirCantidad(item: CarritoItem): void {
    if (item.cantidad > 1) {
      this.marketplaceService.agregarAlCarrito(item.producto, -1);
    }
  }

  quitarDelCarrito(productoId: string): void {
    this.marketplaceService.quitarDelCarrito(productoId);
  }

  vaciarCarrito(): void {
    this.marketplaceService.vaciarCarrito();
  }

  calcularPrecioConDescuento(precio: number, descuento?: number): number {
    if (descuento) {
      return precio * (1 - descuento / 100);
    }
    return precio;
  }

  abrirModalPago(): void {
    this.mostrarModalPago = true;
  }

  cerrarModalPago(): void {
    this.mostrarModalPago = false;
  }

  procesarPagoCompletado(): void {
    // Vaciar el carrito después del pago exitoso
    this.marketplaceService.vaciarCarrito();
    
    // Cerrar la modal después de un breve delay
    setTimeout(() => {
      this.mostrarModalPago = false;
    }, 1000);
  }

}
