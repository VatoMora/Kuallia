import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRetosComponent } from './admin-retos/admin-retos.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';

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
