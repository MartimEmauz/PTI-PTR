import { Component } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { GeneralUser } from '../../Model/general-users-model';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.css']
})
export class ProfileCompletionComponent {
  name: string = '';
  gender: string = '';
  birthYear: Date | undefined;
  address: string = '';
  nif: string = '';
  cc: string = '';
  phoneNumber: string = '';

  constructor(
    private masterService: MasterService,
    private auth: AuthService
  ) { }

  onCompleteProfile() {
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user && user.email) {
        const userData: Partial<GeneralUser> = {
          firstname: this.name,
          gender: this.gender,
          birthday: this.birthYear,
          address: parseInt(this.address),
          idcivil: parseInt(this.nif),
          idfiscal: parseInt(this.cc),
          email: user.email // Use authenticated user's email
        };

        this.masterService.updateUser(user.email, userData).subscribe(
          response => {
            console.log('Profile updated successfully:', response);
            // Handle success
          },
          error => {
            console.error('Error updating profile:', error);
            // Handle error
          }
        );
      }
    });
  }
}
