import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopUpComponent } from 'src/app/login-pop-up/login-pop-up.component';
import { RegisterPopUpComponent } from 'src/app/register-pop-up/register-pop-up.component'; // Add this import

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  badgevisible = false;
  
  constructor(private dialog: MatDialog) {}

  badgevisibility() {
    this.badgevisible = true;
  }

  userLogin() {
    this.Openpopup(0, 'User LogIn', LoginPopUpComponent);
  }

  openSignupDialog() {
    this.Openpopup(0, 'User Signup', RegisterPopUpComponent); // Add this method
  }

  Openpopup(code: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '800ms',
      exitAnimationDuration: '800ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      // Handle any actions after the dialog closes
      // this.loadcustomer(); // Example: reload customer data
    });
  }
}
