import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { IndexComponent } from './index/index.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { MaterialModule } from '../material/material.module';
import { ShopComponent } from './shop.component';
import { TokenInterceptor } from '../services/token-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    ShopComponent,
    IndexComponent,
    ProductsComponent,
    CartComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MaterialModule,
  ]
})
export class ShopModule { }
