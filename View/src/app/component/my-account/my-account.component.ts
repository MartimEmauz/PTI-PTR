import { Component } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  userName: string = "John Doe";
  userEmail: string = "john@example.com";
  userPhone: string = "(XX) XXXX-XXXX";
}
