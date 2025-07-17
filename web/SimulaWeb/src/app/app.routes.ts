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
    path: '**',
    redirectTo: '/login'
  }
];
