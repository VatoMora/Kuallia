import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService, ProductoRequest } from '../../../services/producto.service';
import { Producto } from '../../../models/negocio.model';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  productoForm: FormGroup;
  editMode = false;
  negocioId: number | null = null;
  productoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      costo: ['', [Validators.required, Validators.min(0)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      unidades: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.negocioId = Number(params['negocioId']);
      this.productoId = params['id'] ? Number(params['id']) : null;

      if (this.productoId) {
        this.editMode = true;
        this.cargarProducto(this.productoId);
      }
    });
  }

  cargarProducto(id: number): void {
    this.productoService.buscarPorId(id).subscribe({
      next: (producto) => this.productoForm.patchValue(producto),
      error: (error) => console.error('Error al cargar el producto:', error)
    });
  }

  guardarProducto(): void {
    if (this.productoForm.invalid || !this.negocioId) return;

    const producto: ProductoRequest = {
      ...this.productoForm.value,
      negocioId: this.negocioId
    };

    if (this.editMode && this.productoId) {
      this.productoService.actualizar(this.productoId, producto).subscribe({
        next: () => this.router.navigate(['/kpi-buddy/inventario']),
        error: (error) => console.error('Error al actualizar el producto:', error)
      });
    } else {
      this.productoService.crearProducto(producto).subscribe({
        next: () => this.router.navigate(['/kpi-buddy/inventario']),
        error: (error) => console.error('Error al crear el producto:', error)
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/kpi-buddy/inventario']);
  }
}

