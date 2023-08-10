import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { IndexComponent } from './index/index.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '', component: ShopComponent, children: [
      { path: '', component: IndexComponent, pathMatch: "full" },
      { path: 'index', component: IndexComponent, pathMatch: "full" },
      { path: 'products', component: ProductsComponent, pathMatch: "full" },
      { path: 'orders', component: OrdersComponent, pathMatch: "full" },
      { path: 'cart', component: CartComponent, pathMatch: "full" }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
