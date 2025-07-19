import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KpiBuddyInventarioComponent } from './kpibuddy-inventario/kpi-buddy-inventario.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/kpi-buddy/inventario',
    pathMatch: 'full'
  },
  {
    path: 'inventario',
    component: KpiBuddyInventarioComponent
  },
  {
    path: 'agregar',
    component: AgregarProductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpiBuddyRoutingModule { }

