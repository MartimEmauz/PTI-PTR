import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-pop-up',
  templateUrl: './register-pop-up.component.html',
  styleUrls: ['./register-pop-up.component.css']
})
export class RegisterPopUpComponent {
  signupForm: FormGroup; // Ensure this name matches the template

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RegisterPopUpComponent>
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required] // Corrected from "adress"
    });
  }

  userSignUp() {
    if (this.signupForm.valid) {
      // Implement your signup logic here
      const formValues = this.signupForm.value;
      console.log('Signing up with:', formValues);

      // Close the popup after signing up
      this.closePopup();
    }
  }

  closePopup() {
    // Implement your close popup logic here
    this.dialogRef.close();
  }
}
