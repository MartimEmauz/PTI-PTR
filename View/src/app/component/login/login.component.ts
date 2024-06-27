import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor() { }

  onLogin() {
    // This is where you would handle the login logic
    // For example, you could send a request to your backend to authenticate the user
    console.log("Username:", this.username);
    console.log("Password:", this.password);
  }
}
