import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SliderComponent } from './component/slider/slider.component';
import { LeiloesComponent } from './component/leiloes/leiloes.component';
import { MyLeiloesComponent } from './component/myleiloes/myleiloes.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'slider',component:SliderComponent},
  {path:'leiloes',component:LeiloesComponent},
  {path:'myleiloes',component:MyLeiloesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
