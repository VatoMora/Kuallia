import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PerfilService } from '../../services/perfil.service';
import { AuthService } from '../../core/services/auth.service';
import { PerfilUsuario } from '../../models/perfil-usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  perfil: PerfilUsuario | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private perfilService: PerfilService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // Obtener el ID del usuario actual
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.cargarPerfil(currentUser.id);
    } else {
      this.router.navigate(['/login']);
    }
  }

  cargarPerfil(id: number): void {
    this.isLoading = true;
    this.error = null;

    this.perfilService.obtenerPerfilUsuario(id).subscribe({
      next: (perfil) => {
        this.perfil = perfil;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar el perfil:', error);
        this.error = 'Error al cargar la información del perfil';
        this.isLoading = false;
      }
    });
  }

  getInitials(): string {
    if (!this.perfil) return '';
    return this.perfil.nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'No especificado';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  getRolLabel(rol: string): string {
    switch (rol) {
      case 'ADMIN':
        return 'Administrador';
      case 'EMPRENDEDOR':
        return 'Emprendedor';
      default:
        return rol;
    }
  }

  navigateToFreemium(): void {
    this.router.navigate(['/suscripcion-freemium']);
  }
}
