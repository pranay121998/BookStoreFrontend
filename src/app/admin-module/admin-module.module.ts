import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/token-interceptor';
import { AppModule } from "../app.module";
import { UrlSanatizerPipe } from '../pipes/url-sanatizer.pipe';



@NgModule({
  declarations: [
    AddProductComponent,
    AdminProductsComponent,
    UrlSanatizerPipe
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    MaterialModule,
    ReactiveFormsModule,

  ]
})
export class AdminModuleModule { }
