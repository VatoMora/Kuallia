import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceHomeComponent } from './marketplace/marketplace-home/marketplace-home.component';
import { ProductoDetalleComponent } from './marketplace/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './marketplace/carrito/carrito.component';
import { CategoriaProductosComponent } from './marketplace/categoria-productos/categoria-productos.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    MarketplaceHomeComponent,
    ProductoDetalleComponent,
    CarritoComponent,
    CategoriaProductosComponent
  ]
})
export class MarketplaceModule { }
