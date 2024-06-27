import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-spa-js';
import { MasterService } from '../../service/master.service';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthSwitchService } from '../../auth-switch.service';
import { PoliceUser } from 'src/app/Model/police-users-model';
import { GeneralUser } from 'src/app/Model/general-users-model';



@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  badgevisible = false;
  profileImage: string | null = null;
  initials: string = '';
  userName: string = ''; // Add this property
  userId: string = ''; // Add this property
  userEmail: string | null =null;// Add this property

  isAuthenticated$ = this._auth.isAuthenticated$;
  constructor(
    public _auth: AuthService,
    private router: Router,
    private apiService: MasterService,
    private authSwitchService: AuthSwitchService
  ) {}

  ngOnInit(): void {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user !== null && user !== undefined) {
        this.userId = user.sub || ''; // Provide a default value if user.sub is undefined
        this.userName = user.name || ''; // Store the user's name
        this.userEmail = user.email || null;                 //COMENTEI AQUI PQ TAVA A DAR ERRO

        // Set profile image or initials
        if (user.picture) {
          this.profileImage = user.picture;
        } else if (user.name) {
          this.initials = this.getInitials(user.name); //COMENTEI AQUI PQ TAVA A DAR ERRO
        }
      }
    });
    
  }

  badgevisibility() {
    this.badgevisible = true;
  }

  isPoliceUser(): boolean {
    return this.authSwitchService.getRole() === 'police';
  }

  getInitials(name: string): string {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : '';
    const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';
    return (firstNameInitial + lastNameInitial).toUpperCase();
  }


  navigateToAccount() {
    this.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/my-account-logado']);
      } else {
        this.router.navigate(['/myaccount']);
      }
    });
  }


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


  isProfileCompletedPolice(email: string): Observable<boolean> {
    return this.apiService.getPoliceUserByEmail(email).pipe(
      map((user: PoliceUser | null) => {
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


}
