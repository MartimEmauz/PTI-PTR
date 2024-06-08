import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-spa-js';
import { MasterService } from '../../service/master.service';
import { GeneralUser } from '../../Model/general-users-model';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  badgevisible = false;

  constructor(
    public _auth: AuthService,
    private router: Router,
    private apiService: MasterService
  ) {}

  ngOnInit(): void {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user !== null && user !== undefined) {
        const userId = user.sub || ''; // Provide a default value if user.sub is undefined
        const profileCompleted = this.isProfileCompleted(userId);
        if (!profileCompleted) {
          this.router.navigate(['/profile-completion']);
        }
      }
    });

    this._auth.loginWithPopup().subscribe(() => {
      this.signUp();
    });
  }

  isProfileCompleted(userId: string): boolean {
    // Implement logic to check if the user has completed their profile
    // Return true if the profile is completed, false otherwise
    // For demonstration purposes, always return false in this example
    return false;
  }

  signUp() {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user !== null && user !== undefined) {
        if (user.email) {
          const generalUser: GeneralUser = {
            email: user.email,
          };
          this.apiService.createUser(generalUser).subscribe(
            response => {
              console.log('User added to generalusers table:', response);
              this.router.navigate(['/profile-completion']);
            },
            error => {
              console.error('Error adding user to generalusers table:', error);
            }
          );
        } else {
          console.error('User does not have an email');
        }
      } else {
        console.error('User is null or undefined');
      }
    });
  }

  badgevisibility() {
    this.badgevisible = true;
  }
}
