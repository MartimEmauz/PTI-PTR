import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
export class ProfileCompletionComponent implements OnInit {
  profileForm: FormGroup;

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
      birthday: ['', [Validators.required, this.dateValidator]],
      street: ['', Validators.required],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      zip: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{3}$/)]],
      nif: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      cc: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });
  }

  ngOnInit() {}

  onCompleteProfile() {
    if (this.profileForm.valid) {
      this.auth.user$.subscribe((user: User | null | undefined) => {
        if (user && user.email) {
          const address: Address = {
            street: this.profileForm.value.street,
            country: this.profileForm.value.country,
            city: this.profileForm.value.city,
            zip: this.profileForm.value.zip,
          };

          this.masterService.createAddress(address).subscribe(
            (addressResponse) => {
              const formattedDate = this.profileForm.value.birthday.split('T')[0];

              const userData: Partial<GeneralUser> = {
                firstname: this.profileForm.value.firstname,
                lastname: this.profileForm.value.lastname,
                password: null,
                gender: this.profileForm.value.gender,
                birthday: formattedDate,
                status: true,
                address: addressResponse.id,
                idcivil: parseInt(this.profileForm.value.nif),
                idfiscal: parseInt(this.profileForm.value.cc),
                email: user.email,
                phonenumber: parseInt(this.profileForm.value.phoneNumber),
              };

              this.masterService.updateUser(user.email!, userData).subscribe(
                (response) => {
                  this.router.navigate(['']);
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
    } else {
      console.error('Profile form is invalid');
    }
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return isNaN(Date.parse(control.value)) ? { 'invalidDate': true } : null;
  }
}
