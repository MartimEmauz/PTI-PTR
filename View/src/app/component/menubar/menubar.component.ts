import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopUpComponent } from 'src/app/login-pop-up/login-pop-up.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  badgevisible = false;
  
  constructor(public _auth: AuthService) {}

  badgevisibility() {
    this.badgevisible = true;
  }

 

}



