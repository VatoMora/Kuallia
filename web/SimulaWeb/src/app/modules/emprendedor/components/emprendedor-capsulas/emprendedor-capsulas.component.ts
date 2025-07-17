import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapsulaService } from '../../../../services/capsula.service';
import { CapsulaResponse } from '../../../../models';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-emprendedor-capsulas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emprendedor-capsulas.component.html',
  styleUrls: ['./emprendedor-capsulas.component.css']
})
export class EmprendedorCapsulasComponent implements OnInit {
  capsulas: CapsulaResponse[] = [];
  isLoading = false;
  error = '';
  searchTerm = '';
  filtroTipo: 'TODOS' | 'EXITO' | 'ERROR' = 'TODOS';
  selectedCapsula: CapsulaResponse | null = null;
  showModal = false;

  constructor(private capsulaService: CapsulaService) {}

  ngOnInit(): void {
    this.loadCapsulas();
  }

  loadCapsulas(): void {
    this.isLoading = true;
    this.error = '';
    
    this.capsulaService.getCapsulas()
      .pipe(
        catchError(error => {
          this.error = 'Error al cargar las cápsulas. Por favor, intenta de nuevo.';
          console.error('Error loading capsulas:', error);
          return of([]);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(capsulas => {
        this.capsulas = capsulas;
      });
  }

  searchCapsulas(): void {
    if (!this.searchTerm.trim()) {
      this.loadCapsulas();
      return;
    }

    this.isLoading = true;
    this.error = '';
    
    this.capsulaService.buscarCapsulas(this.searchTerm)
      .pipe(
        catchError(error => {
          this.error = 'Error al buscar cápsulas. Por favor, intenta de nuevo.';
          console.error('Error searching capsulas:', error);
          return of([]);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(capsulas => {
        this.capsulas = capsulas;
      });
  }

  filterByTipo(tipo: 'TODOS' | 'EXITO' | 'ERROR'): void {
    this.filtroTipo = tipo;
    if (tipo === 'TODOS') {
      this.loadCapsulas();
    } else {
      this.isLoading = true;
      this.error = '';
      
      this.capsulaService.getCapsulasPorTipo(tipo)
        .pipe(
          catchError(error => {
            this.error = 'Error al filtrar cápsulas. Por favor, intenta de nuevo.';
            console.error('Error filtering capsulas:', error);
            return of([]);
          }),
          finalize(() => this.isLoading = false)
        )
        .subscribe(capsulas => {
          this.capsulas = capsulas;
        });
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadCapsulas();
  }

  abrirCapsula(capsula: CapsulaResponse): void {
    this.selectedCapsula = capsula;
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.selectedCapsula = null;
  }

  getCapsulaIcon(tipo: string): string {
    return tipo === 'EXITO' ? 'fa-check-circle' : 'fa-exclamation-triangle';
  }

  getCapsulaColor(tipo: string): string {
    return tipo === 'EXITO' ? 'text-success' : 'text-danger';
  }

  getCapsulaLabel(tipo: string): string {
    return tipo === 'EXITO' ? 'Éxito' : 'Error Común';
  }

  refresh(): void {
    this.loadCapsulas();
  }
}
