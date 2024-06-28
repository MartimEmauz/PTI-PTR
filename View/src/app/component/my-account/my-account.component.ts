import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-spa-js';
import { GeneralUser } from '../../Model/general-users-model';
import { MasterService } from '../../service/master.service';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthSwitchService } from '../../auth-switch.service';
import { PoliceUser } from 'src/app/Model/police-users-model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  constructor(
    public _auth: AuthService,
    private router: Router,
    private apiService: MasterService,
    private authSwitchService: AuthSwitchService
  ) {}

  checkUser(email: string | undefined) {
    if (email) {
      this.apiService.getUserByEmail(email).subscribe(
        (user) => {
          console.log('User exists:', user);
          this.isProfileCompleted(email).subscribe(
            (profileCompleted) => {
              if (!profileCompleted) {
                console.log('Profile is not completed');
                this.router.navigate(['/profile-completion']);
              }
              else {
                this.router.navigate(['/my-account-logado']);
              }
            },
            (error) => {
              console.error('Error checking profile completion:', error);
            }
          );
        },
        (error) => {
          if (error.status === 404) {
            console.log('User does not exist, signing up...');
            this.signUp();
          } else {
            console.error('Error checking user existence:', error);
          }
        }
      );
    } else {
      console.error('User email is undefined');
    }
  }

  signUp() {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user !== null && user !== undefined) {
        if (user.email) {
          const generalUser: GeneralUser = {
            email: user.email,
          };
          this.apiService.createUser(generalUser).subscribe(
            (response) => {
              console.log('User added to generalusers table:', response);
              this.router.navigate(['/profile-completion']);
            },
            (error) => {
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

  isProfileCompleted(email: string): Observable<boolean> {
    return this.apiService.getUserByEmail(email).pipe(
      map((user: GeneralUser | null) => {
        if (user) {
          const { password, ...userData } = user;
          return Object.values(userData).every(value => value !== null);
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error checking user:', error);
        return of(false);
      })
    );
  }

  loginGeneral(): void {
    this.authSwitchService.switchToGeneralUserClient().subscribe({
      next: () => {
        console.log('General user logged in successfully');
        this._auth.user$.subscribe((user: User | null | undefined) => {
          if (user !== null && user !== undefined) {
            this.checkUser(user.email);
          }
        });
      },
      error: (err) => console.error('Error logging in as general user:', err),
    });
  }

  loginPolice(): void {
    this.authSwitchService.switchToPoliceUserClient().subscribe({
      next: () => {
        console.log('Police user logged in successfully');
        this._auth.user$.subscribe((user: User | null | undefined) => {
          if (user !== null && user !== undefined) {
            this.checkPoliceUser(user.email);
          }
        });
      },
      error: (err) => console.error('Error logging in as police user:', err),
    });
  }

  checkPoliceUser(email: string | undefined) {
    if (email) {
      this.apiService.getPoliceUserByEmail(email).subscribe(
        (user) => {
          console.log('PoliceUser exists:', user);
          this.isProfileCompletedPolice(email).subscribe(
            (profileCompleted) => {
              if (!profileCompleted) {
                console.log('Profile is not completed');
                this.router.navigate(['/profile-completion-policeman']);
              }
              else {
                this.router.navigate(['/my-account-logado']);
              }
            },
            (error) => {
              console.error('Error checking profile completion:', error);
            }
          );
        },
        (error) => {
          if (error.status === 404) {
            console.log('PoliceUser does not exist, signing up...');
            this.signUpPolice();
          } else {
            console.error('Error checking policeuser existence:', error);
          }
        }
      );
    } else {
      console.error('PoliceUser email is undefined');
    }
  }

  signUpPolice() {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user !== null && user !== undefined) {
        if (user.email) {
          const policeUser: PoliceUser = {
            email: user.email,
          };
          this.apiService.createPoliceUser(policeUser).subscribe(
            (response) => {
              console.log('User added to userpolice table:', response);
              this.router.navigate(['/profile-completion-policeman']);
            },
            (error) => {
              console.error('Error adding user to userpolice table:', error);
            }
          );
        } else {
          console.error('PoliceUser does not have an email');
        }
      } else {
        console.error('PoliceUser is null or undefined');
      }
    });
  }

  isProfileCompletedPolice(email: string): Observable<boolean> {
    return this.apiService.getPoliceUserByEmail(email).pipe(
      map((user: PoliceUser | null) => {
        if (user) {
          const { password, ...userData } = user;
          return Object.values(userData).every(value => value !== null);
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error checking user:', error);
        return of(false);
      })
    );
  }

  isPoliceUser(): boolean {
    return this.authSwitchService.getRole() === 'police';
  }
}
