import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { MenubarComponent } from '../menubar/menubar.component'; // Import MenubarComponent

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
    email: '', // Initialize email as empty
    avatarUrl: 'assets/avatar.png'  // Default avatar URL
  };

  profileImage: string | null = null;
  userName: string = ''; // Initialize userName
  isEditing: boolean = false; // Track if the user is editing the profile

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private menubarComponent: MenubarComponent // Inject MenubarComponent
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
    this.loadUserData(); // Load user data

    // Subscribe to user$ to get authenticated user information
    this.auth.user$.subscribe({
      next: (user: User | null | undefined) => {
        if (user) {
          this.userName = user.name || ''; // Set the user's name
          this.user.email = user.email || ''; // Set the user's email
        }
      },
      error: (err: any) => {
        console.error('Error retrieving user:', err);
      }
    });

    this.profileImage = this.menubarComponent.profileImage; // Load profile image from MenubarComponent
  }

  loadUserData(): void {
    // Simulate loading user data
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
      email: '', // Initialize email as empty
      avatarUrl: 'assets/avatar.png'
    };

    this.user = userData;
    this.profileForm.patchValue(userData);
  }

  onSave(): void {
    if (this.profileForm.valid) {
      this.user = this.profileForm.value;
      console.log(this.user); // In a real application, update user data via a service
      this.isEditing = false; // Exit edit mode after saving
    }
  }

  onCancel(): void {
    this.profileForm.patchValue(this.user);
    this.isEditing = false; // Exit edit mode without saving
  }

  editProfile(): void {
    this.isEditing = true; // Enter edit mode
  }

  deactivateAccount(): void {
    // Implement account deactivation logic here
    console.log('Account deactivated');
  }

  deleteAccount(): void {
    // Implement account deletion logic here
    console.log('Account deleted');
  }
}
