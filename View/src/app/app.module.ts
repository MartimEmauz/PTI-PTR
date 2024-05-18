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
    RegisterPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
