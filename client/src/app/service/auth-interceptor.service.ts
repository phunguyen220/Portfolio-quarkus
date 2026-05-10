import { Injectable, NgZone } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private ngZone: NgZone
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = typeof localStorage !== 'undefined'
      ? localStorage.getItem('authToken')
      : null;

    const isAuthPublicApi =
      req.url.includes('/auth/signin') ||
      req.url.includes('/auth/signup') ||
      req.url.includes('/auth/refresh');

    let authReq = req;

    if (token && !isAuthPublicApi) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.ngZone.run(() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userCurrent');
            localStorage.removeItem('idProfile');
            localStorage.removeItem('idProfileUser');
            this.router.navigate(['/login']);
          });
        }

        return throwError(() => error);
      })
    );
  }
}