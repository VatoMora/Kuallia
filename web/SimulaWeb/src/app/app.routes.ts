import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'retos',
    loadComponent: () => import('./modules/emprendedor/components/emprendedor-retos/emprendedor-retos.component').then(m => m.EmprendedorRetosComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'capsulas',
    loadComponent: () => import('./modules/emprendedor/components/emprendedor-capsulas/emprendedor-capsulas.component').then(m => m.EmprendedorCapsulasComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'historial',
    loadComponent: () => import('./modules/emprendedor/components/emprendedor-historial/emprendedor-historial.component').then(m => m.EmprendedorHistorialComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadComponent: () => import('./components/perfil/perfil.component').then(m => m.PerfilComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'emprendedor',
    loadChildren: () => import('./modules/emprendedor/emprendedor.module').then(m => m.EmprendedorModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
