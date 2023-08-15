import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from '../../pages/home/components/product-box/product-box.component'; // Adjust the import path based on your directory structure
import { RouterModule } from '@angular/router';
import { FiltersComponent } from 'src/app/pages/home/components/filters/filters.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ProductBoxComponent, FiltersComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatCardModule,

  ],
  exports: [ProductBoxComponent, FiltersComponent]
})
export class SharedModule { }
