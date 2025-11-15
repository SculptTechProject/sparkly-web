import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {MeResult} from '../models/meResult';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  me(): Observable<MeResult> {
    return this.http.get<MeResult>(`${this.apiUrl}/profile/me`);
  }
}
