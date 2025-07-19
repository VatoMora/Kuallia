import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NegocioService } from '../../services/negocio.service';
import { Negocio, TiempoSimulacion } from '../../models/negocio.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-ioemprendo',
  imports: [CommonModule, FormsModule],
  templateUrl: './ioemprendo.component.html',
  styleUrls: ['./ioemprendo.component.css']
})
export class IoemprendoComponent implements OnInit {
  negocios: Negocio[] = [];
  usuarioId: number = 1; // Se obtendrá del AuthService
  loading = false;
  error = '';
  tiempoSimulacion: TiempoSimulacion = { valor: 1, unidad: 'meses' };
  deletingNegocioId: number | null = null; // Para mostrar estado de carga durante eliminación
  editingNegocioId: number | null = null; // Para rastrear qué negocio se está editando
  editingNegocio: any = {}; // Datos temporales durante la edición

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

  editarNegocio(negocio: Negocio): void {
    // Activar modo de edición para este negocio
    this.editingNegocioId = negocio.id;
    // Copiar los datos actuales para poder cancelar si es necesario
    this.editingNegocio = {
      nombre: negocio.nombre,
      giro: negocio.giro,
      fotoBase64: negocio.fotoBase64
    };
  }

  guardarEdicion(negocio: Negocio): void {
    // Validar datos
    if (!this.editingNegocio.nombre || !this.editingNegocio.giro) {
      alert('El nombre y el giro son campos obligatorios.');
      return;
    }

    // Preparar el objeto de actualización
    const negocioActualizado = {
      nombre: this.editingNegocio.nombre,
      giro: this.editingNegocio.giro,
      fotoBase64: this.editingNegocio.fotoBase64,
      usuarioId: this.usuarioId
    };

    // Llamar al servicio para actualizar
    this.negocioService.actualizar(negocio.id, negocioActualizado).subscribe({
      next: (negocioResponse) => {
        // Actualizar el negocio en la lista local
        const index = this.negocios.findIndex(n => n.id === negocio.id);
        if (index !== -1) {
          // Mantener los productos existentes
          this.negocios[index] = { ...negocioResponse, productos: negocio.productos };
        }
        this.editingNegocioId = null;
        this.editingNegocio = {};
        alert('Negocio actualizado exitosamente.');
      },
      error: (err) => {
        console.error('Error al actualizar el negocio:', err);
        let errorMessage = 'Error al actualizar el negocio. ';
        if (err.status === 404) {
          errorMessage += 'El negocio no fue encontrado.';
        } else if (err.status === 400) {
          errorMessage += err.error || 'Datos inválidos.';
        } else {
          errorMessage += 'Por favor, intenta nuevamente.';
        }
        alert(errorMessage);
      }
    });
  }

  cancelarEdicion(): void {
    this.editingNegocioId = null;
    this.editingNegocio = {};
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen.');
        return;
      }
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB.');
        return;
      }
      // Convertir a base64
      const reader = new FileReader();
      reader.onload = () => {
        this.editingNegocio.fotoBase64 = (reader.result as string).split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  eliminarNegocio(negocio: Negocio): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el negocio "${negocio.nombre}"?`)) {
      this.deletingNegocioId = negocio.id;
      this.error = ''; // Limpiar errores previos
      this.negocioService.eliminar(negocio.id).subscribe({
        next: () => {
          // Eliminar el negocio de la lista local
          this.negocios = this.negocios.filter(n => n.id !== negocio.id);
          this.deletingNegocioId = null;
          // Mostrar mensaje de éxito (opcional)
          alert(`El negocio "${negocio.nombre}" ha sido eliminado exitosamente.`);
        },
        error: (err) => {
          console.error('Error al eliminar el negocio:', err);
          this.deletingNegocioId = null;
          let errorMessage = 'Error al eliminar el negocio. ';
          if (err.status === 404) {
            errorMessage += 'El negocio no fue encontrado.';
          } else if (err.status === 400) {
            errorMessage += err.error || 'Solicitud inválida.';
          } else {
            errorMessage += 'Por favor, intenta nuevamente.';
          }
          alert(errorMessage);
        }
      });
    }
  }

  simularNegocio(negocio: Negocio): void {
    // Navegar a la página de simulación con el ID del negocio
    this.router.navigate(['/simulacion', negocio.id]);
  }
}

