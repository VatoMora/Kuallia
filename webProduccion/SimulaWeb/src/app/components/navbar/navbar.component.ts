import { Component, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, Usuario } from '../../core/services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  currentUser: Usuario | null = null;
  isCollapsed = true;
  showCopiedMessage = false;
  private userSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del usuario autenticado
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngAfterViewInit(): void {
    // Inicializar tooltips de Bootstrap
    this.initializeTooltips();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    // Destruir tooltips
    this.destroyTooltips();
  }

  private initializeTooltips(): void {
    if (typeof bootstrap !== 'undefined') {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }

  private destroyTooltips(): void {
    if (typeof bootstrap !== 'undefined') {
      const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltips.forEach(tooltip => {
        const instance = bootstrap.Tooltip.getInstance(tooltip);
        if (instance) {
          instance.dispose();
        }
      });
    }
  }

  toggleNavbar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // Manejo de teclas para accesibilidad
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (!this.isCollapsed) {
      this.isCollapsed = true;
    }
  }

  // Cerrar dropdown al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.dropdown-menu');
    const dropdownToggle = document.querySelector('#navbarDropdown');
    
    if (dropdown && dropdownToggle && !dropdownToggle.contains(target) && !dropdown.contains(target)) {
      // Cerrar dropdown si está abierto
      const bootstrapDropdown = document.querySelector('.dropdown-menu.show');
      if (bootstrapDropdown) {
        bootstrapDropdown.classList.remove('show');
      }
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openInvitationModal(event: Event): void {
    event.preventDefault();
    const modalElement = document.getElementById('invitationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  copyInvitationLink(): void {
    const invitationUrl = `https://kuallia.com/invitacion/${this.currentUser?.id || 'user'}`;
    navigator.clipboard.writeText(invitationUrl).then(() => {
      this.showCopiedMessage = true;
      setTimeout(() => {
        this.showCopiedMessage = false;
      }, 3000);
    }).catch(err => {
      console.error('Error al copiar el enlace:', err);
      alert('No se pudo copiar el enlace. Por favor, inténtalo de nuevo.');
    });
  }

  shareInvitation(): void {
    const invitationUrl = `https://kuallia.com/invitacion/${this.currentUser?.id || 'user'}`;
    const shareText = `Únete a Kuallia, la plataforma líder en emprendimiento. ¡Crece tu negocio conmigo!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Únete a mi Negocio en Kuallia',
        text: shareText,
        url: invitationUrl
      }).catch((error) => {
        console.log('Error al compartir:', error);
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + invitationUrl)}`;
      window.open(whatsappUrl, '_blank');
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isEmprendedor(): boolean {
    return this.authService.isEmprendedor();
  }

  getInitials(): string {
    return this.authService.getUserInitials();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
