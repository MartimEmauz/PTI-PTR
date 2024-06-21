import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-spa-js';
import { MasterService } from '../../service/master.service';
import { GeneralUser } from '../../Model/general-users-model';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  badgevisible = false;
  profileImage: string | null = null;
  initials: string = '';

  constructor(
    public _auth: AuthService,
    private router: Router,
    private apiService: MasterService
  ) {}

  ngOnInit(): void {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user !== null && user !== undefined) {
        const userId = user.sub || ''; // Provide a default value if user.sub is undefined
        //this.checkUser(user.email);                 //COMENTEI AQUI PQ TAVA A DAR ERRO

        // Set profile image or initials
        if (user.picture) {
          this.profileImage = user.picture;
        } else if (user.name) {
         // this.initials = this.getInitials(user.name); //COMENTEI AQUI PQ TAVA A DAR ERRO
        }
      }
    });
  }
/*
  checkUser(email: string | undefined) {
    if (email) {
      this.apiService.getUserByEmail(email).subscribe(
        (user) => {
          console.log('User exists:', user);
          // Additional logic if user exists
          this.isProfileCompleted(email).subscribe(
            (profileCompleted) => {
              if (!profileCompleted) {
                console.log('Profile is not completed');
                this.router.navigate(['/profile-completion']);
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
              // Redirect to profile completion page after sign-up
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
*/

  badgevisibility() {
    this.badgevisible = true;
  }

  /*
  isProfileCompleted(email: string): Observable<boolean> {
    return this.apiService.getUserByEmail(email).pipe(
      map((user: GeneralUser | null) => {
        if (user) {
          const { password, ...userData } = user; // Destructure user object and exclude email
          return Object.values(userData).every(value => value !== null);
        } else {
          return false; // User not found or error occurred, profile not completed
        }
      }),
      catchError((error) => {
        console.error('Error checking user:', error);
        return of(false); // Return false if there is an error
      })
    );
  }

  getInitials(name: string): string {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : '';
    const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';
    return (firstNameInitial + lastNameInitial).toUpperCase();
  }*/
}
