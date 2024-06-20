import { Injectable } from '@angular/core';
import { AuthService, AuthClientConfig } from '@auth0/auth0-angular';
import { from, Observable } from 'rxjs';
import { AUTH_CONFIG } from './auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthSwitchService {
  constructor(private auth: AuthService, private authClientConfig: AuthClientConfig) {}

  switchToGeneralUserClient(): Observable<void> {
    this.authClientConfig.set({
      clientId: AUTH_CONFIG.generalUserClientId,
      domain: AUTH_CONFIG.domain,
      authorizationParams: {
        redirect_uri: window.location.origin,
      }
    });
    return from(this.auth.loginWithPopup());
  }

  switchToPoliceUserClient(): Observable<void> {
    this.authClientConfig.set({
      clientId: AUTH_CONFIG.policeUserClientId,
      domain: AUTH_CONFIG.domain,
      authorizationParams: {
        redirect_uri: window.location.origin,
      }
    });
    return from(this.auth.loginWithPopup());
  }
}
