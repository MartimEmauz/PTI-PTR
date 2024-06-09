import { Component } from '@angular/core';
import { User } from '@auth0/auth0-spa-js';
import { GeneralUser } from '../../Model/general-users-model';
import { Address } from '../../Model/address.model';
import { AuthService } from '@auth0/auth0-angular';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.css']
})
export class ProfileCompletionComponent {
  name: string = '';
  gender: string = '';
  birthday: string = '';
  street: string = '';
  country: string = '';
  city: string = '';
  zip: string = '';
  nif: string = '';
  cc: string = '';
  phoneNumber: string = '';

  constructor(
    public auth: AuthService,
    private masterService: MasterService,
    private router: Router
  ) {}

  onCompleteProfile() {
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user && user.email) {
        const address: Address = {
          street: this.street,
          country: this.country,
          city: this.city,
          zip: this.zip,
        };

        this.masterService.createAddress(address).subscribe(
          (addressResponse) => {
            const userData: Partial<GeneralUser> = {
              firstname: this.name,
              gender: this.gender,
              birthday: new Date(this.birthday),
              address: addressResponse,
              idcivil: parseInt(this.nif),
              idfiscal: parseInt(this.cc),
              email: user.email,
              phoneNumber: parseInt(this.phoneNumber),
            };

            this.masterService.updateUser(user.email!, userData).subscribe(
              (response) => {
                console.log('Profile updated successfully:', response);
                this.router.navigate(['/profile']);
              },
              (error) => {
                console.error('Error updating profile:', error);
              }
            );
          },
          (error) => {
            console.error('Error creating address:', error);
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

  isDateValid(date: string): boolean {
    return !isNaN(Date.parse(date));
  }

  isAddressValid(address: string): boolean {
    return address.trim().length > 0;
  }

  isCountryValid(country: string): boolean {
    return /^[a-zA-Z\s]+$/.test(country);
  }

  isCityValid(city: string): boolean {
    return /^[a-zA-Z\s]+$/.test(city);
  }

  isZipCodeValid(zip: string): boolean {
    return /^\d{4}-\d{3}$/.test(zip);
  }

  isNifValid(nif: string): boolean {
    return /^\d{9}$/.test(nif);
  }

  isCcValid(cc: string): boolean {
    return /^\d{8}$/.test(cc);
  }

  isPhoneNumberValid(phoneNumber: string): boolean {
    return /^\d{9}$/.test(phoneNumber);
  }
}
