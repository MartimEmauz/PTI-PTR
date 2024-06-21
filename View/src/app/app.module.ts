import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { SliderComponent } from './component/slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './component/popup/popup.component';
import { UserdetailComponent } from './component/userdetail/userdetail.component';
import { LeiloesComponent } from './component/leiloes/leiloes.component';
import { MyLeiloesComponent } from './component/myleiloes/myleiloes.component';
import { LoginComponent } from './component/login/login.component';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { EntrarRegistarComponent } from './component/entrar-registar/entrar-registar.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginPopUpComponent } from './login-pop-up/login-pop-up.component';
import { RegisterPopUpComponent } from './register-pop-up/register-pop-up.component';
import { AuthModule } from '@auth0/auth0-angular';
import { ProfileCompletionComponent } from './component/profile-completion/profile-completion.component';
import { PoliticaPrivacidadeComponent } from './component/politica-privacidade/politica-privacidade.component';
import { DatePipe } from '@angular/common';
import { ObjetosperdidosComponent } from './component/objetosperdidos/objetosperdidos.component';
import { MyAccountLogadoComponent } from './component/my-account-logado/my-account-logado.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    HomeComponent,
    SliderComponent,
    PopupComponent,
    UserdetailComponent,
    LeiloesComponent,
    MyLeiloesComponent,
    LoginComponent,
    MyAccountComponent,
    EntrarRegistarComponent,
    FooterComponent,
    LoginPopUpComponent,
    RegisterPopUpComponent,
    ProfileCompletionComponent,
    PoliticaPrivacidadeComponent,
    ObjetosperdidosComponent,
    MyAccountLogadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-7ety36lrjtchzs5o.us.auth0.com',
      clientId: 'QtBbOFF8p3ObAlrfl8NvoARtRysybsAi',
      authorizationParams: {
        redirectUri: window.location.origin,
      }
    }),
    MatSlideToggleModule // Add MatSlideToggleModule to imports
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
