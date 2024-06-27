import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@auth0/auth0-spa-js';
import { AuthService } from '@auth0/auth0-angular';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { PoliceUser } from 'src/app/Model/police-users-model';
import { PolicePost } from 'src/app/Model/postopolice.model';

@Component({
  selector: 'app-profile-completion-policeman',
  templateUrl: './profile-completion-policeman.component.html',
  styleUrls: ['./profile-completion-policeman.component.css']
})
export class ProfileCompletionPolicemanComponent implements OnInit {
  profileForm: FormGroup;
  postosDePolicia: PolicePost[] = [];
  

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private masterService: MasterService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      internalid: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      postopolice: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadPostosDePolicia();
  }

  loadPostosDePolicia() {
    this.masterService.getPolicePosts().subscribe(
      (data: PolicePost[]) => {
        this.postosDePolicia = data;
      },
      (error: any) => {
        console.error('Erro ao carregar postos de polícia:', error);
      }
    );
  }

  onCompleteProfile() {
    if (this.profileForm.valid) {
      this.auth.user$.subscribe((user: User | null | undefined) => {
        if (user && user.email) {
          const userData: Partial<PoliceUser> = {
            firstname: this.profileForm.value.firstname,
            lastname: this.profileForm.value.lastname,
            password: null, // Default password
            internalid: this.profileForm.value.internalid,
            postopolice: parseInt(this.profileForm.value.postopolice),
            email: user.email,
          };
          console.log(this.profileForm.value.internalid),


          console.log('Updating user with data:', userData);

          this.masterService.updatePoliceUser(user.email!, userData).subscribe(
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
    } else {
      console.error('Profile form is invalid');
    }
  }
}
