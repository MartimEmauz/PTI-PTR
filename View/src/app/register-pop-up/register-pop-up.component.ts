import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-pop-up',
  templateUrl: './register-pop-up.component.html',
  styleUrls: ['./register-pop-up.component.css']
})
export class registerPopUpComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<registerPopUpComponent>
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      date: ['', Validators.required],
      adress: ['', Validators.required]
    });
  }

  userSignUp() {
    if (this.signupForm.valid) {
      // Implement your signup logic here
      const formValues = this.signupForm.value;
      console.log('Signing up with:', formValues);

      // For demonstration purposes, let's close the popup after signing up
      this.closepopup();
    }
  }

  closepopup() {
    // Implement your close popup logic here
    this.dialogRef.close();
  }
}