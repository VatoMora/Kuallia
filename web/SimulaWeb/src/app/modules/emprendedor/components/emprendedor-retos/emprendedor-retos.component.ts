import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RetoService } from '../../../../services/reto.service';
import { RetoResponse, RespuestaRetoRequest, RespuestaRetoResponse } from '../../../../models';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-emprendedor-retos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emprendedor-retos.component.html',
  styleUrls: ['./emprendedor-retos.component.css']
})
export class EmprendedorRetosComponent implements OnInit {
  retos: RetoResponse[] = [];
  isLoading = false;
  error = '';
  selectedReto: RetoResponse | null = null;
  showModal = false;
  selectedOption: number | null = null;
  processingResponse = false;
  respuestaResult: RespuestaRetoResponse | null = null;
  searchTerm = '';

  // Usuario simulado (en una app real vendría del servicio de autenticación)
  currentUser = {
    id: 1,
    nombre: 'Usuario Demo',
    email: 'usuario@demo.com'
  };

  constructor(private retoService: RetoService) {}

  ngOnInit(): void {
    this.loadRetos();
  }

  loadRetos(): void {
    this.isLoading = true;
    this.error = '';
    
    this.retoService.getRetos()
      .pipe(
        catchError(error => {
          this.error = 'Error al cargar los retos. Por favor, intenta de nuevo.';
          console.error('Error loading retos:', error);
          return of([]);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(retos => {
        this.retos = retos;
      });
  }

  searchRetos(): void {
    if (!this.searchTerm.trim()) {
      this.loadRetos();
      return;
    }

    this.isLoading = true;
    this.error = '';
    
    this.retoService.buscarRetos(this.searchTerm)
      .pipe(
        catchError(error => {
          this.error = 'Error al buscar retos. Por favor, intenta de nuevo.';
          console.error('Error searching retos:', error);
          return of([]);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(retos => {
        this.retos = retos;
      });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadRetos();
  }

  abrirReto(reto: RetoResponse): void {
    this.selectedReto = reto;
    this.selectedOption = null;
    this.respuestaResult = null;
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.selectedReto = null;
    this.selectedOption = null;
    this.respuestaResult = null;
  }

  selectOption(option: number): void {
    this.selectedOption = option;
  }

  submitRespuesta(): void {
    if (!this.selectedReto || this.selectedOption === null) {
      return;
    }

    this.processingResponse = true;
    const respuestaRequest: RespuestaRetoRequest = {
      opcionElegida: this.selectedOption
    };

    this.retoService.responderReto(this.selectedReto.id, this.currentUser.id, respuestaRequest)
      .pipe(
        catchError(error => {
          this.error = 'Error al enviar la respuesta. Por favor, intenta de nuevo.';
          console.error('Error submitting respuesta:', error);
          return of(null);
        }),
        finalize(() => this.processingResponse = false)
      )
      .subscribe(result => {
        if (result) {
          this.respuestaResult = result;
        }
      });
  }

  refresh(): void {
    this.loadRetos();
  }
}
