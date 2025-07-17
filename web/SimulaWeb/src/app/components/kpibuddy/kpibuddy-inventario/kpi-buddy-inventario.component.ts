import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/negocio.model';

@Component({
  selector: 'app-kpi-buddy-inventario',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './kpi-buddy-inventario.component.html',
  styleUrls: ['./kpi-buddy-inventario.component.css']
})
export class KpiBuddyInventarioComponent implements OnInit {
  productos: Producto[] = [];
  cargando = false;
  error = '';
  
  // Variables para estadísticas
  totalProductos = 0;
  valorInventario = 0;
  valorPotencial = 0;

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.error = '';
    
    // Por ahora cargaremos todos los productos
    // Necesitarás ajustar esto según tu API
    const usuarioId = Number(localStorage.getItem('userId'));
    
    // Temporal: usar el método existente con un ID fijo
    // Deberías crear un nuevo endpoint que liste todos los productos del usuario
    this.productoService.listarPorNegocio(1).subscribe({
      next: (productos) => {
        this.productos = productos;
        this.calcularEstadisticas();
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.error = 'Error al cargar el inventario';
        this.cargando = false;
        // Si no hay productos, mostrar array vacío
        this.productos = [];
      }
    });
  }

  calcularEstadisticas(): void {
    this.totalProductos = this.productos.reduce((sum, p) => sum + p.unidades, 0);
    this.valorInventario = this.productos.reduce((sum, p) => sum + (p.costo * p.unidades), 0);
    this.valorPotencial = this.productos.reduce((sum, p) => sum + (p.precio * p.unidades), 0);
  }

  agregarProducto(): void {
    this.router.navigate(['/kpibuddy/agregar']);
  }

  editarProducto(producto: Producto): void {
    this.router.navigate(['/kpibuddy/agregar'], { 
      queryParams: { id: producto.id } 
    });
  }

  eliminarProducto(producto: Producto): void {
    if (confirm(`¿Está seguro de eliminar el producto ${producto.nombre}?`)) {
      this.productoService.eliminar(producto.id).subscribe({
        next: () => {
          this.cargarProductos();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          this.error = 'Error al eliminar el producto';
        }
      });
    }
  }
}
