import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { MenubarComponent } from '../menubar/menubar.component'; // Import MenubarComponent
import { MasterService } from '../../service/master.service'; // Import MasterService
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
    avatarUrl: 'assets/avatar.png'  // Default avatar URL
  };

  profileImage: string | null = null;
  userName: string = ''; // Initialize userName
  isEditing: boolean = false; // Track if the user is editing the profile

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private menubarComponent: MenubarComponent, // Inject MenubarComponent
    private service: MasterService // Inject MasterService
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
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user) {
        const email = user.email || this.user.email; // Use the authenticated user's email
        this.service.getUserByEmail(email).subscribe({
          next: (userData: any) => {
            console.log('User data:', userData);
            this.user = userData; // Update local user data
            this.profileForm.patchValue(userData); // Update profile form with user data
          },
          error: (err: any) => {
            console.error('Error retrieving user data:', err);
          }
        });
      }
    });
  }

  onSave(): void {
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user && this.profileForm.valid) {
        const email = user.email || this.user.email; // Use o email do usuário autenticado
        const updatedUserData = this.profileForm.value;
        updatedUserData.email = email; // Adicione o email ao objeto de dados atualizado
        this.service.updateUser(email, updatedUserData).subscribe({
          next: (updatedUser: any) => {
            console.log('User updated:', updatedUser);
            this.isEditing = false; // Exit edit mode after saving
            this.user = updatedUserData; // Atualize os dados do usuário localmente após a atualização
          },
          error: (err: any) => {
            console.error('Error updating user:', err);
          }
        });
      }
    });
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
            console.log('User deleted:', email);// Redirect to home after logout
          },
          error: (err: any) => {
            console.error('Error deleting user:', err);
          }
        });
      }
    });
  }
}
