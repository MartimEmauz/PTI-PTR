import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.css']
})
export class LoginPopUpComponent {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoginPopUpComponent>
  ) {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  userLogin() {
    if (this.myForm.valid) {
      // Implement your login logic here
      const username = this.myForm.get('username')?.value;
      const password = this.myForm.get('password')?.value;
      console.log('Logging in with username:', username, 'and password:', password);

      // For demonstration purposes, let's close the popup after logging in
      this.closepopup();
    }
  }

  closepopup() {
    // Implement your close popup logic here
    this.dialogRef.close();
  }
}