import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisNegociosComponent } from './components/mis-negocios/mis-negocios.component';
import { AgregarNegocioComponent } from './components/agregar-negocio/agregar-negocio.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mis-negocios',
    pathMatch: 'full'
  },
  {
    path: 'mis-negocios',
    component: MisNegociosComponent
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
