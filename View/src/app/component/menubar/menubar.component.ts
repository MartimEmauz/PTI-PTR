import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-spa-js';
import { MasterService } from '../../service/master.service';
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
  userName: string = ''; // Add this property

  constructor(
    public _auth: AuthService,
    private router: Router,
    private apiService: MasterService
  ) {}

  ngOnInit(): void {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user !== null && user !== undefined) {
        const userId = user.sub || ''; // Provide a default value if user.sub is undefined
        this.userName = user.name || ''; // Store the user's name
        //this.checkUser(user.email);                 //COMENTEI AQUI PQ TAVA A DAR ERRO

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

  getInitials(name: string): string {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : '';
    const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';
    return (firstNameInitial + lastNameInitial).toUpperCase();
  }
}
