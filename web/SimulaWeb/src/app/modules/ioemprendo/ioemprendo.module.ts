import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IoemprendoRoutingModule } from './ioemprendo-routing.module';
import { MisNegociosComponent } from './components/mis-negocios/mis-negocios.component';
import { AgregarNegocioComponent } from './components/agregar-negocio/agregar-negocio.component';
import { NegocioService } from './services/negocio.service';
import { AuthService } from '../../core/services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    IoemprendoRoutingModule,
    MisNegociosComponent,
    AgregarNegocioComponent
  ],
  providers: [
    NegocioService,
    AuthService
  ]
})
export class IoemprendoModule { }
