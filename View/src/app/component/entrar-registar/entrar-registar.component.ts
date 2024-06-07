import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrar-registar',
  templateUrl: './entrar-registar.component.html',
  styleUrls: ['./entrar-registar.component.css']
})
export class EntrarRegistarComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onSignUp() {
    console.log("Email:", this.email);
    console.log("Password:", this.password);
    // Handle the sign-up logic
    // On successful sign-up, navigate to profile completion page
    this.router.navigate(['/profile-completion']);
  }

  onLogin() {
    // Navigate to login or handle login logic here
  }
}
