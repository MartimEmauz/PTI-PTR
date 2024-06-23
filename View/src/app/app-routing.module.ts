import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { MapaComponent } from './component/mapa/mapa.component';
import { AuctionComponent } from './component/auction/auction.component';
import { MyLeiloesComponent } from './component/myleiloes/myleiloes.component';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { LoginComponent } from './component/login/login.component';
import { EntrarRegistarComponent } from './component/entrar-registar/entrar-registar.component';
import { ProfileCompletionComponent } from './component/profile-completion/profile-completion.component';
import { ProfileCompletionPolicemanComponent } from './component/profile-completion-policeman/profile-completion-policeman.component';
import { PoliticaPrivacidadeComponent } from './component/politica-privacidade/politica-privacidade.component';
import { AuthGuard } from './auth.guard';
import { ObjetosperdidosComponent } from './component/objetosperdidos/objetosperdidos.component';
import { MyAccountLogadoComponent } from './component/my-account-logado/my-account-logado.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mapa', component: MapaComponent, canActivate: [AuthGuard]},
  { path: 'auction', component: AuctionComponent, canActivate: [AuthGuard]},
  { path: 'myleiloes', component: MyLeiloesComponent, canActivate: [AuthGuard]},
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'entrar-registar', component: EntrarRegistarComponent },
  { path: 'profile-completion', component: ProfileCompletionComponent, canActivate: [AuthGuard]},
  { path: 'profile-completion-policeman', component: ProfileCompletionPolicemanComponent, canActivate: [AuthGuard]},
  { path: 'politica-privacidade', component: PoliticaPrivacidadeComponent },
  { path: 'objetosperdidos', component: ObjetosperdidosComponent },
  {path: 'my-account-logado', component: MyAccountLogadoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
