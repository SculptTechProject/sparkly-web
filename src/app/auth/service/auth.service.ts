import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment.development";
import {AuthResults} from "../models/auth.results";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: { identifier: string; password: string }): Observable<any> {
    return this.http.post<AuthResults>(`${this.apiUrl}/auth/login`, data);
  }

  register(data: { username: string, email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  refresh(refreshToken: string): Observable<AuthResults> {
    return this.http.post<AuthResults>(`${this.apiUrl}/auth/refresh`, {
      refreshToken,
    });
  }

  saveTokens(result: AuthResults): void {
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }
}
