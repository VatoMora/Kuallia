import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminRetosComponent } from './components/admin-retos/admin-retos.component';
import { AdminUsuariosComponent } from './components/admin-usuarios/admin-usuarios.component';
import { AdminEstadisticasComponent } from './components/admin-estadisticas/admin-estadisticas.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminDashboardComponent,
    AdminRetosComponent,
    AdminUsuariosComponent,
    AdminEstadisticasComponent
  ]
})
export class AdminModule { }
