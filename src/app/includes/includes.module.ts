import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncludesRoutingModule } from './includes-routing.module';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IncludesRoutingModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class IncludesModule { }
