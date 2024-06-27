// my-account-logado.component.ts

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
    if(!this.isPoliceUser()){
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
    }else{
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
      this.service.getAdressById(address).subscribe({
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
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user && this.profileForm.valid) {
        const email = user.email || this.user.email; // Use authenticated user's email
        const updatedUserData = this.profileForm.value;
        updatedUserData.email = email; // Add email to updated data object
  
        // Check if there's an existing address or create a new one
        if (!this.user.address) {
          // If there's no address, create a new one
          const newAddress: Address = {
            street: updatedUserData.street,
            country: updatedUserData.country,
            city: updatedUserData.city,
            zip: updatedUserData.zip
          };
  
          // Save the new address
          this.service.createAddress(newAddress).subscribe({
            next: (createdAddress: Address) => {
              console.log('Created new address:', createdAddress);
              this.user.address = createdAddress;
              updatedUserData.address = createdAddress.id; // Assuming address has a unique ID
  
              // Update user with the new addressId
              this.updateUserWithAddress(email, updatedUserData);
            },
            error: (err: any) => {
              console.error('Error creating new address:', err);
            }
          });
        } else {
          // If there's an existing address, update it
          const existingAddress = this.user.address;
          existingAddress.street = updatedUserData.street;
          existingAddress.country = updatedUserData.country;
          existingAddress.city = updatedUserData.city;
          existingAddress.zip = updatedUserData.zip;
  
          // Update the existing address
          this.service.updateAddress(existingAddress).subscribe({
            next: (updatedAddress: Address) => {
              console.log('Updated address:', updatedAddress);
              this.user.address = updatedAddress;
              console.log('Updated user data:', updatedAddress.id);
              updatedUserData.address= updatedAddress.id;
  
              // Update user with the updated addressId
              this.updateUserWithAddress(email, updatedUserData);
            },
            error: (err: any) => {
              console.error('Error updating address:', err);
            }
          });
        }
      }
    });
    this.loadUserData(); // Reload user data after saving
  }
  

  updateUserWithAddress(email: string, updatedUserData: any): void {
    // Update user data with address
    if(!this.isPoliceUser()){
    this.service.updateUser(email, updatedUserData).subscribe({
      next: (updatedUser: any) => {
        console.log('User updated with address:', updatedUser);
        this.isEditing = false; // Exit edit mode after saving
        this.user = updatedUserData; // Update user data locally after update
      },
      error: (err: any) => {
        console.error('Error updating user with address:', err);
      }
    });
  }else{
    this.service.updatePoliceUser(email, updatedUserData).subscribe({
      next: (updatedUser: any) => {
        console.log('User updated with address:', updatedUser);
        this.isEditing = false; // Exit edit mode after saving
        this.user = updatedUserData; // Update user data locally after update
      },
      error: (err: any) => {
        console.error('Error updating user with address:', err);
      }
    });
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
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user) {
        const email = user.email || this.user.email;
        this.service.deleteUser(email).subscribe({
          next: () => {
            console.log('User deleted:', email); // Redirect to home after logout
          },
          error: (err: any) => {
            console.error('Error deleting user:', err);
          }
        });
      }
    });
  }
}
