import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmprendedorDashboardComponent } from './components/emprendedor-dashboard/emprendedor-dashboard.component';
import { EmprendedorRetosComponent } from './components/emprendedor-retos/emprendedor-retos.component';
import { EmprendedorCapsulasComponent } from './components/emprendedor-capsulas/emprendedor-capsulas.component';
import { EmprendedorHistorialComponent } from './components/emprendedor-historial/emprendedor-historial.component';

const routes: Routes = [
  {
    path: '',
    component: EmprendedorDashboardComponent
  },
  {
    path: 'retos',
    component: EmprendedorRetosComponent
  },
  {
    path: 'capsulas',
    component: EmprendedorCapsulasComponent
  },
  {
    path: 'historial',
    component: EmprendedorHistorialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmprendedorRoutingModule { }
