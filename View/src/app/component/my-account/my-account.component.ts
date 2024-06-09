import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {

  constructor(private router: Router) {}

  auth(action: string, userType: string): void {
    const authUrl = `https://your-oauth-provider.com/${action}?user=${userType}`;
    window.location.href = authUrl; // Redireciona para o OAuth
  }
}
