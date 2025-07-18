import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceHomeComponent } from './marketplace/marketplace-home/marketplace-home.component';
import { ProductoDetalleComponent } from './marketplace/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './marketplace/carrito/carrito.component';
import { CategoriaProductosComponent } from './marketplace/categoria-productos/categoria-productos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/marketplace/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MarketplaceHomeComponent
  },
  {
    path: 'categoria/:id',
    component: CategoriaProductosComponent
  },
  {
    path: 'producto/:id',
    component: ProductoDetalleComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
