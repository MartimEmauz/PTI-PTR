import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { MenubarComponent } from '../menubar/menubar.component'; // Import MenubarComponent
import { MasterService } from '../../service/master.service'; // Import MasterService
import { Address } from 'src/app/Model/address.model';
import { AuthSwitchService } from 'src/app/auth-switch.service';

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
    idfiscal: '',
    idcivil: '',
    phonenumber: '',
    email: '', // Initialize email as empty
    avatarUrl: 'assets/avatar.png',  // Default avatar URL
    address: '' // Initialize address as null
  };

  profileImage: string | null = null;
  userName: string = ''; // Initialize userName
  isEditing: boolean = false; // Track if the user is editing the profile

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private menubarComponent: MenubarComponent, // Inject MenubarComponent
    private service: MasterService, // Inject MasterService
    private authSwitchService: AuthSwitchService
  ) {
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      street: [''],
      country: [''],
      city: [''],
      zip: ['',],
      idfiscal: ['', [Validators.required]],
      idcivil: ['', [Validators.required]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
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
    if (!this.isPoliceUser()) {
      this.auth.user$.subscribe((user: User | null | undefined) => {
        if (user) {
          const email = user.email || this.user.email;
          this.service.getUserByEmail(email).subscribe({
            next: (userData: any) => {
              console.log('User data:', userData);
              this.user = userData; // Update user data locally
              this.profileForm.patchValue(userData); // Update form with user data
              this.loadUserAddress(userData.address); // Load user address
            },
            error: (err: any) => {
              console.error('Error retrieving user data:', err);
            }
          });
        }
      });
    } else {
      this.auth.user$.subscribe((user: User | null | undefined) => {
        if (user) {
          const email = user.email || this.user.email;
          this.service.getPoliceByEmail(email).subscribe({
            next: (userData: any) => {
              console.log('User data:', userData);
              this.user = userData; // Update user data locally
              this.profileForm.patchValue(userData); // Update form with user data
              this.loadUserAddress(userData.address); // Load user address
            },
            error: (err: any) => {
              console.error('Error retrieving user data:', err);
            }
          });
        }
      });
    }
  }

  isPoliceUser(): boolean {
    return this.authSwitchService.getRole() === 'police';
  }

  loadUserAddress(address: number): void {
    if (address) {
      this.service.getAddressById(address).subscribe({
        next: (addressData: Address) => {
          console.log('Address data:', addressData);
          // Update address in local user data
          this.user.address = addressData;
        },
        error: (err: any) => {
          console.error('Error retrieving user address:', err);
        }
      });
    }
  }

  onSave(): void {
    // Implement onSave logic if needed
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
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user) {
        const email = user.email || this.user.email;
  
        // First, delete the user from the database
        this.service.deleteUser(email).subscribe({
          next: () => {
            console.log('User deleted from database:', email);
  
            // Second, log out the user from Auth0
            this.auth.logout();
          },
          error: (err: any) => {
            console.error('Error deleting user from database:', err);
          }
        });
      }
    });
  }
  
}
