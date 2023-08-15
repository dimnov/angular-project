import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { FiltersComponent } from 'src/app/pages/home/components/filters/filters.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [HomeComponent, FooterComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
