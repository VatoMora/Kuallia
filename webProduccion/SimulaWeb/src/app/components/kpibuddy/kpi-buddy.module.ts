import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiBuddyRoutingModule } from './kpi-buddy-routing.module';
import { KpiBuddyInventarioComponent } from './kpibuddy-inventario/kpi-buddy-inventario.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    KpiBuddyRoutingModule,
    KpiBuddyInventarioComponent,
    AgregarProductoComponent
  ]
})
export class KpiBuddyModule { }
