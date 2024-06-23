import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-spa-js';
import { GeneralUser } from '../../Model/general-users-model';
import { Address } from '../../Model/address.model';

@Component({
  selector: 'app-my-account-logado',
  templateUrl: './my-account-logado.component.html',
  styleUrls: ['./my-account-logado.component.css']
})
export class MyAccountLogadoComponent implements OnInit {

  profileForm: FormGroup;
  user: any = {
    firstname: '',
    lastname: '',
    gender: '',
    birthday: '',
    street: '',
    country: '',
    city: '',
    zip: '',
    nif: '',
    cc: '',
    phoneNumber: '',
    email: 'john.doe@example.com',
    avatarUrl: 'assets/avatar.png'  // Default avatar URL
  };

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private masterService: MasterService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      street: ['', Validators.required],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      zip: ['', [Validators.required]],
      nif: ['', [Validators.required]],
      cc: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
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
      firstname: 'João',
      lastname: 'Silva',
      gender: 'male',
      birthday: '1990-01-01',
      street: 'Rua Principal 123',
      country: 'Portugal',
      city: 'Lisboa',
      zip: '1000-001',
      nif: '123456789',
      cc: '987654321',
      phoneNumber: '912345678',
      email: 'joao.silva@example.com',
      avatarUrl: 'assets/avatar.png'
    };

    this.user = userData;
    this.profileForm.patchValue(userData);
  }

  onSave(): void {
    if (this.profileForm.valid) {
      this.user = this.profileForm.value;
      // In a real application, update user data via a service
      // For now, let's just log the updated user data
      console.log(this.user);
    }
  }

  onCancel(): void {
    this.profileForm.patchValue(this.user);
  }
}
