import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltersComponent } from 'src/app/pages/home/components/filters/filters.component';

const routes: Routes = [
  {
    path: '',
    component: FiltersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltersRoutingModule { }
