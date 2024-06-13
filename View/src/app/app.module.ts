import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { DatePipe } from '@angular/common';

// Auth0 Imports
import { AuthModule } from '@auth0/auth0-angular';

// Components
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { SliderComponent } from './component/slider/slider.component';
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
import { ProfileCompletionComponent } from './component/profile-completion/profile-completion.component';
import { PoliticaPrivacidadeComponent } from './component/politica-privacidade/politica-privacidade.component';

// Interceptor
import { AuthInterceptor } from './auth.interceptor';

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
    PoliticaPrivacidadeComponent
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
        audience: 'http://127.0.0.1:8000/',
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://127.0.0.1:8000/generaluser/*',
            tokenOptions: {
              authorizationParams: {
                audience: 'http://127.0.0.1:8000/',
              } 
            }
          }
        ]
      }
    })
  ],
  providers: [
    DatePipe,
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
