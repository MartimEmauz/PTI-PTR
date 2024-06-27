import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { MenubarComponent } from '../menubar/menubar.component';
import { MasterService } from '../../service/master.service';
import { Address } from 'src/app/Model/address.model';
import { AuthSwitchService } from 'src/app/auth-switch.service';
import { PolicePost } from 'src/app/Model/postopolice.model';

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
    email: '',
    avatarUrl: 'assets/avatar.png',
    address: ''
  };

  postosDePolicia: PolicePost[] = [];
  profileImage: string | null = null;
  userName: string = '';
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private menubarComponent: MenubarComponent,
    private service: MasterService,
    private authSwitchService: AuthSwitchService
  ) {
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      gender: [''],
      birthday: [''],
      street: [''],
      country: [''],
      city: [''],
      zip: [''],
      idfiscal: [''],
      idcivil: [''],
      phonenumber: [''],
      internalid: ['', [Validators.pattern(/^\d{9}$/)]],
      postopolice: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.auth.user$.subscribe({
      next: (user: User | null | undefined) => {
        if (user) {
          this.userName = user.name || '';
          this.user.email = user.email || '';
        }
      },
      error: (err: any) => {
        console.error('Error retrieving user:', err);
      }
    });
    this.profileImage = this.menubarComponent.profileImage;

    if (this.isPoliceUser()) {
      this.loadPostosDePolicia();
    }
  }

  loadUserData(): void {
    if (!this.isPoliceUser()) {
      this.auth.user$.subscribe((user: User | null | undefined) => {
        if (user) {
          const email = user.email || this.user.email;
          this.service.getUserByEmail(email).subscribe({
            next: (userData: any) => {
              this.user = userData;
              this.profileForm.patchValue(userData);
              this.loadUserAddress(userData.address);
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
              this.user = userData;
              this.profileForm.patchValue(userData);
              this.loadUserAddress(userData.address);
            },
            error: (err: any) => {
              console.error('Error retrieving user data:', err);
            }
          });
        }
      });
    }
  }

  loadPostosDePolicia(): void {
    this.service.getPolicePosts().subscribe(
      (data: PolicePost[]) => {
        this.postosDePolicia = data;
      },
      (error: any) => {
        console.error('Erro ao carregar postos de polícia:', error);
      }
    );
  }

  isPoliceUser(): boolean {
    return this.authSwitchService.getRole() === 'police';
  }

  loadUserAddress(address: number): void {
    if (address) {
      this.service.getAddressById(address).subscribe({
        next: (addressData: Address) => {
          this.user.address = addressData;
        },
        error: (err: any) => {
          console.error('Error retrieving user address:', err);
        }
      });
    }
  }

  onSave(): void {
    if (this.profileForm.valid) {
      const userData = this.profileForm.value;
      console.log('User Data:', userData);  // Log user data for debugging
  
      if (this.isPoliceUser()) {
        const updatedData = {
          firstname: userData.firstname,
          lastname: userData.lastname,
          internalid: userData.internalid,
          postopolice: userData.postopolice ? parseInt(userData.postopolice) : null,
          email: this.user.email,
          password: null  // Default password
        };
        console.log('Updated Police Data:', updatedData);  // Log police data for debugging
  
        this.service.updatePoliceUser(this.user.email, updatedData).subscribe({
          next: () => {
            this.isEditing = false;
            this.loadUserData();
          },
          error: (err: any) => {
            console.error('Error updating police user data:', err);
          }
        });
      } else {
        console.log('Updated User Data:', userData);  // Log regular user data for debugging
  
        this.service.updateUser(this.user.email, userData).subscribe({
          next: () => {
            this.isEditing = false;
            this.loadUserData();
          },
          error: (err: any) => {
            console.error('Error updating user data:', err);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.profileForm.patchValue(this.user);
    this.isEditing = false;
  }

  editProfile(): void {
    this.isEditing = true;
  }

  deactivateAccount(): void {
    console.log('Account deactivated');
  }

  deleteAccount(): void {
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user) {
        const email = user.email || this.user.email;
        this.service.deleteUser(email).subscribe({
          next: () => {
            console.log('User deleted from database:', email);
            this.auth.logout();
          },
          error: (err: any) => {
            console.error('Error deleting user from database:', err);
          }
        });
      }
    });
  }

  deletePoliceAccount(): void {
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user) {
        const email = user.email || this.user.email;
        this.service.deletePoliceUser(email).subscribe({
          next: () => {
            console.log('User deleted from database:', email);
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
