import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { IncludesModule } from './includes/includes.module';
import { AdminModuleModule } from './admin-module/admin-module.module';
import { ShopModule } from './shop/shop.module';
import { HttpClientModule } from "@angular/common/http"
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { LoginGuard } from './auth/login/login.guard';
import { ShopGuard } from './shop/shop.guard';

@NgModule({
  declarations: [
    AppComponent
    //pipes
  ],
  imports: [
    BrowserModule,//.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IncludesModule,
    ShopModule,
    AuthModule,
    AdminModuleModule
  ], exports: [HttpClientModule],
  providers: [LoginGuard, ShopGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
