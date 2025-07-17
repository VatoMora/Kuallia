import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService, RetoService, RespuestaService } from '../../services';
import { UsuarioEstadisticas, RetoEstadisticas, HistorialRespuestas } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any = {
    id: 1,
    nombre: 'Usuario Demo',
    rol: 'EMPRENDEDOR',
    email: 'usuario@demo.com',
    saldo: 1000,
    nivel: 5
  };
  
  loading = false;
  error = '';
  
  // Estadísticas
  usuarioStats: UsuarioEstadisticas | null = null;
  retoStats: RetoEstadisticas | null = null;
  historialUsuario: HistorialRespuestas | null = null;
  
  // Datos para gráficos simples
  recentActivity: any[] = [];
  progressData: any = {
    retosResueltos: 0,
    totalRetos: 0,
    porcentajeProgreso: 0
  };

  constructor(
    private usuarioService: UsuarioService,
    private retoService: RetoService,
    private respuestaService: RespuestaService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = '';

    // Cargar estadísticas según el rol del usuario
    if (this.isAdmin()) {
      this.loadAdminData();
    } else {
      this.loadEmprendedorData();
    }
  }

  loadAdminData(): void {
    // Cargar estadísticas de usuarios
    this.usuarioService.getEstadisticas().subscribe({
      next: (stats) => {
        this.usuarioStats = stats;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });

    // Cargar estadísticas de retos
    this.retoService.getEstadisticas().subscribe({
      next: (stats) => {
        this.retoStats = stats;
      },
      error: (err) => {
        console.error('Error loading reto stats:', err);
      }
    });
  }

  loadEmprendedorData(): void {
    // Cargar historial del usuario
    this.respuestaService.getHistorialUsuario(this.currentUser.id).subscribe({
      next: (historial) => {
        this.historialUsuario = historial;
        this.updateProgressData();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });

    // Cargar estadísticas generales de retos
    this.retoService.getEstadisticas().subscribe({
      next: (stats) => {
        this.retoStats = stats;
        this.updateProgressData();
      },
      error: (err) => {
        console.error('Error loading reto stats:', err);
      }
    });
  }

  updateProgressData(): void {
    if (this.historialUsuario && this.retoStats) {
      this.progressData = {
        retosResueltos: this.historialUsuario.totalRespuestas,
        totalRetos: this.retoStats.totalRetos,
        porcentajeProgreso: this.retoStats.totalRetos > 0 
          ? (this.historialUsuario.totalRespuestas / this.retoStats.totalRetos) * 100 
          : 0
      };
    }
  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.rol === 'ADMIN';
  }

  isEmprendedor(): boolean {
    return this.currentUser && this.currentUser.rol === 'EMPRENDEDOR';
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }

  refreshData(): void {
    this.loadDashboardData();
  }
}
