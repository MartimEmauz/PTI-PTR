import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-account-logado',
  templateUrl: './my-account-logado.component.html',
  styleUrls: ['./my-account-logado.component.css']
})
export class MyAccountLogadoComponent implements OnInit {

  profileForm: FormGroup;
  user: any = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    avatarUrl: 'assets/avatar.png'  // Default avatar URL
  };

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.required],
      address: [this.user.address, Validators.required]
    });
  }

  ngOnInit(): void {
    // Simulate loading user data
    this.loadUserData();
  }

  loadUserData(): void {
    // In a real application, fetch user data from a service
    // For now, we're using hardcoded data
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Anytown, USA',
      avatarUrl: 'assets/sport.jpg'
    };

    this.user = userData;
    this.profileForm.patchValue(userData);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.user = this.profileForm.value;
      // In a real application, update user data via a service
    }
  }

  onCancel(): void {
    this.profileForm.patchValue(this.user);
  }
}
