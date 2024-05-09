import { Component } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  userName: string = "Darina Jimenez";
  userEmail: string = "jdarinaJimenezSIUU@example.com";
  userPhone: string = "(XX) XXXX-XXXX";
}
