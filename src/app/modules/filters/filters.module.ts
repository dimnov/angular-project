import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from 'src/app/pages/home/components/filters/filters.component';
import { SharedModule } from '../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FiltersRoutingModule,
    SharedModule,
  ]
})
export class FiltersModule { }
