import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRetosComponent } from './admin-retos/admin-retos.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  },
  {
    path: 'retos',
    component: AdminRetosComponent
  },
  {
    path: 'usuarios',
    component: AdminUsuariosComponent
  },
  {
    path: 'estadisticas',
    component: AdminEstadisticasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
