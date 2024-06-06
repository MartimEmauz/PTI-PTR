import { Component } from '@angular/core';

@Component({
  selector: 'app-entrar-registar',
  templateUrl: './entrar-registar.component.html',
  styleUrls: ['./entrar-registar.component.css']
})
export class EntrarRegistarComponent {
  email: string ="";
  password: string="";

  constructor() { }

  onSignUp() {
    // Your signup logic here
  }

  onLogin() {
    // Your login logic here
  }
}
