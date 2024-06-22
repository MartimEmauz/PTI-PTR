import { Injectable } from '@angular/core';
import { AuthService, AuthClientConfig } from '@auth0/auth0-angular';
import { from, Observable, of, switchMap } from 'rxjs';
import { AUTH_CONFIG } from './auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthSwitchService {
  constructor(private auth: AuthService, private authClientConfig: AuthClientConfig) {}

  private roles: string[] = [];

  switchToGeneralUserClient(): Observable<void> {
    this.authClientConfig.set({
      clientId: AUTH_CONFIG.generalUserClientId,
      domain: AUTH_CONFIG.domain,
      authorizationParams: {
        redirect_uri: window.location.origin,
      }
    });
    return from(this.auth.loginWithPopup()).pipe(
        switchMap(() => this.auth.user$),
        switchMap(user => {
          if (user) {
                this.clearRoles(); // Clear all roles
                return this.addRole('general');
          }
          return of(undefined);
        })
      );
  }

  switchToPoliceUserClient(): Observable<void> {
    this.authClientConfig.set({
      clientId: AUTH_CONFIG.policeUserClientId,
      domain: AUTH_CONFIG.domain,
      authorizationParams: {
        redirect_uri: window.location.origin,
      }
    });
    return from(this.auth.loginWithPopup()).pipe(
        switchMap(() => this.auth.user$),
        switchMap(user => {
          if (user) {
            this.clearRoles(); // Clear all roles
            return this.addRole('police'); // Add police role on login
          }
          return of(undefined);
        })
      );
  }

  getRoles(): Observable<string[]> {
    return of(this.roles);
  }

  addRole(role: string): Observable<void> {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
    return of(undefined);
  }

  removeRole(role: string): Observable<void> {
    this.roles = this.roles.filter(r => r !== role);
    return of(undefined);
  }

  clearRoles(): Observable<void> {
    this.roles = [];
    return of(undefined);
  }
}
