import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { MatTooltipModule } from '@angular/material/tooltip'; // Import MatTooltipModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { MapaComponent } from './component/mapa/mapa.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './component/popup/popup.component';
import { UserdetailComponent } from './component/userdetail/userdetail.component';
import { AuctionComponent } from './component/auction/auction.component';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ProfileCompletionPolicemanComponent } from './component/profile-completion-policeman/profile-completion-policeman.component';
@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    HomeComponent,
    MapaComponent,
    PopupComponent,
    UserdetailComponent,
    AuctionComponent,
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
    ProfileCompletionPolicemanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
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
