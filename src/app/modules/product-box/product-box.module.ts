import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductBoxRoutingModule } from './product-box-routing.module';
import { ProductBoxComponent } from 'src/app/pages/home/components/product-box/product-box.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ProductBoxRoutingModule,
    SharedModule
  ]
})
export class ProductBoxModule { }
