import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    CartRoutingModule,
    MatButtonModule,
  ]
})
export class CartModule { }
