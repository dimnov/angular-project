import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductBoxComponent } from 'src/app/pages/home/components/product-box/product-box.component';

const routes: Routes = [
  {
    path: '',
    component: ProductBoxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductBoxRoutingModule { }
