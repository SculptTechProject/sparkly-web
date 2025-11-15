import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.auth.getAccessToken();

    let authReq = req;
    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          const refreshToken = this.auth.getRefreshToken();

          if (!refreshToken || this.isRefreshing) {
            this.auth.clearTokens();
            return throwError(() => err);
          }

          this.isRefreshing = true;

          return this.auth.refresh(refreshToken).pipe(
            tap(result => {
              this.auth.saveTokens(result);
              this.isRefreshing = false;
            }),
            switchMap(() => {
              const newAccessToken = this.auth.getAccessToken();
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              return next.handle(retryReq);
            }),
            catchError(refreshErr => {
              this.isRefreshing = false;
              this.auth.clearTokens();
              return throwError(() => refreshErr);
            })
          );
        }

        return throwError(() => err);
      })
    );
  }
}
