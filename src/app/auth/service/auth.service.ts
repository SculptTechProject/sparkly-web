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

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }
}
