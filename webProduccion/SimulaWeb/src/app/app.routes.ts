import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'perfil',
    loadComponent: () => import('./components/perfil/perfil.component').then(m => m.PerfilComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'ioemprendo',
    loadChildren: () => import('./components/ioemprendo.module').then(m => m.IoemprendoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'kpi-buddy',
    loadChildren: () => import('./components/kpibuddy/kpi-buddy.module').then(m => m.KpiBuddyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'aprende',
    loadComponent: () => import('./components/aprende/aprende.component').then(m => m.AprendeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'marketplace',
    loadChildren: () => import('./components/marketplace.module').then(m => m.MarketplaceModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'simulacion/:id',
    loadComponent: () => import('./components/simulacion/simulacion.component').then(m => m.SimulacionComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'realidad-virtual',
    loadComponent: () => import('./components/realidad-virtual/realidad-virtual.component').then(m => m.RealidadVirtualComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'suscripcion-freemium',
    loadComponent: () => import('./components/suscripcion-freemium/suscripcion-freemium.component').then(m => m.SuscripcionFreemiumComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
