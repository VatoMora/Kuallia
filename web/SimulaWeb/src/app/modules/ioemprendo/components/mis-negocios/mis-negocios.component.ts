import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NegocioService } from '../../services/negocio.service';
import { Negocio, TiempoSimulacion } from '../../models/negocio.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-mis-negocios',
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-negocios.component.html',
  styleUrls: ['./mis-negocios.component.css']
})
export class MisNegociosComponent implements OnInit {
  negocios: Negocio[] = [];
  usuarioId: number = 1; // Se obtendrá del AuthService
  loading = false;
  error = '';
  tiempoSimulacion: TiempoSimulacion = { valor: 1, unidad: 'meses' };

  constructor(
    private negocioService: NegocioService, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.usuarioId = currentUser.id;
      this.cargarNegocios();
    } else {
      this.error = 'No se pudo obtener la información del usuario logueado';
    }
  }

  cargarNegocios(): void {
    this.loading = true;
    this.negocioService.listarPorUsuarioConProductos(this.usuarioId).subscribe({
      next: (negocios) => {
        this.negocios = negocios;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar los negocios:', err);
        this.error = 'Hubo un problema al cargar los negocios';
        this.loading = false;
      }
    });
  }

  agregarNegocio(): void {
    this.router.navigate(['/ioemprendo/agregar']);
  }
}

