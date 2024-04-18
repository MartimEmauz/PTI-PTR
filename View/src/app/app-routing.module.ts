import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SliderComponent } from './component/slider/slider.component';
import { TableComponent } from './component/table/table.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'slider',component:SliderComponent},
  {path:'table',component:TableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
