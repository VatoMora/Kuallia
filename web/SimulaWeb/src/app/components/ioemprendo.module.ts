import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IoemprendoRoutingModule } from './ioemprendo-routing.module';
import { IoemprendoComponent } from './ioEmprendo/ioemprendo.component';
import { AgregarNegocioComponent } from './agregar-negocio/agregar-negocio.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IoemprendoRoutingModule,
    IoemprendoComponent,
    AgregarNegocioComponent
  ]
})
export class IoemprendoModule { }
