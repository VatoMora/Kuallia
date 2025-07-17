import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, Usuario } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: Usuario | null = null;
  isCollapsed = true;
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

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
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
