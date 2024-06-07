import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SliderComponent } from './component/slider/slider.component';
import { LeiloesComponent } from './component/leiloes/leiloes.component';
import { MyLeiloesComponent } from './component/myleiloes/myleiloes.component';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { LoginComponent } from './component/login/login.component';
import { EntrarRegistarComponent } from './component/entrar-registar/entrar-registar.component';
import { ProfileCompletionComponent } from './component/profile-completion/profile-completion.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'leiloes', component: LeiloesComponent },
  { path: 'myleiloes', component: MyLeiloesComponent },
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'entrar-registar', component: EntrarRegistarComponent },
  { path: 'profile-completion', component: ProfileCompletionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
