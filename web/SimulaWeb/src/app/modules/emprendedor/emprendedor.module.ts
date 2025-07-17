import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmprendedorRoutingModule } from './emprendedor-routing.module';
import { EmprendedorDashboardComponent } from './components/emprendedor-dashboard/emprendedor-dashboard.component';
import { EmprendedorRetosComponent } from './components/emprendedor-retos/emprendedor-retos.component';
import { EmprendedorCapsulasComponent } from './components/emprendedor-capsulas/emprendedor-capsulas.component';
import { EmprendedorHistorialComponent } from './components/emprendedor-historial/emprendedor-historial.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EmprendedorRoutingModule,
    EmprendedorDashboardComponent,
    EmprendedorRetosComponent,
    EmprendedorCapsulasComponent,
    EmprendedorHistorialComponent
  ]
})
export class EmprendedorModule { }
