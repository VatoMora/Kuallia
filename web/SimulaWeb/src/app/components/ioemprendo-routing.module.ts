import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IoemprendoComponent } from './ioEmprendo/ioemprendo.component';
import { AgregarNegocioComponent } from './agregar-negocio/agregar-negocio.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ioemprendo/mis-negocios',
    pathMatch: 'full'
  },
  {
    path: 'mis-negocios',
    component: IoemprendoComponent
  },
  {
    path: 'agregar',
    component: AgregarNegocioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IoemprendoRoutingModule { }
