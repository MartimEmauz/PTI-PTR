import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth.idTokenClaims$.pipe(
      mergeMap((claims: any) => {
        const token = claims.__raw; // Access the raw ID token
        if (token) {
          // Clone the request and set the Authorization header with the access token
          const cloned = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`	
            }
          });
          // Return the modified request to the next handler
          return next.handle(cloned);
        }
        // If no token is available, proceed with the original request
        return next.handle(request);
      })
    );
  }

  getProtectedData(): Observable<any> {
    return this.auth.idTokenClaims$.pipe(
      mergeMap((claims: any) => {
        const token = claims.__raw; // Access the raw ID token
        if (token) {
          // Make an authenticated HTTP GET request to the protected endpoint
          return this.http.get('http://127.0.0.1:8000/protected/', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } else {
          // If no token is available, return an empty observable or handle it as needed
          return throwError('No access token available');
        }
      })
    );
  }
}