import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = fetch(environment.apiUrl);

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: { displayName: string, email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
