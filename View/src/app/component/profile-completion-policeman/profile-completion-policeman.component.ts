import { Component } from '@angular/core';
import { User } from '@auth0/auth0-spa-js';
import { AuthService } from '@auth0/auth0-angular';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { PoliceUser } from 'src/app/Model/police-users-model';

@Component({
  selector: 'app-profile-completion-policeman',
  templateUrl: './profile-completion-policeman.component.html',
  styleUrls: ['./profile-completion-policeman.component.css']
})
export class ProfileCompletionPolicemanComponent {
  firstname: string = '';
  lastname: string = '';
  password: string = '';
  internalid: string = "";
  postopolice: string = "";

  constructor(
    public auth: AuthService,
    private masterService: MasterService,
    private router: Router
  ) { }

  onCompleteProfile() {
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user && user.email) {
        const userData: Partial<PoliceUser> = {
          firstname: this.firstname,
          lastname: this.lastname,
          password: null, // Default password
          internalid: parseInt(this.internalid),
          postopolice: parseInt(this.postopolice),
          email: user.email,
        };

        console.log('Updating user with data:', userData); // Log dos dados do usuário

        this.masterService.updateUser(user.email!, userData).subscribe(
          (response) => {
            console.log('Profile updated successfully:', response);
            this.router.navigate(['']);
          },
          (error: any) => {
            console.error('Error updating profile:', error);
          }
        );
      } else {
        console.error('User email is undefined');
      }
    });
  }

  isNameValid(name: string): boolean {
    return /^[a-zA-Z\s]+$/.test(name);
  }

  isInternalIdValid(internalid: string): boolean {
    return /^\d{9}$/.test(internalid);
  }

  isPostoPoliceValid(postopolice: string): boolean {
    return /^\d{8}$/.test(postopolice);
  }
}
