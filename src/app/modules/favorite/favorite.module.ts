import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from 'src/app/pages/favorite/favorite.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [FavoriteComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatGridListModule,
    FavoriteRoutingModule,
    MatButtonModule,
    SharedModule
  ]
})
export class FavoriteModule { }
