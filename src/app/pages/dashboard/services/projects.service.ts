import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProjectFeedItem} from '../types/project.projectfeeditem';
import {environment} from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  random(take = 20): Observable<ProjectFeedItem[]> {
    return this.http.get<ProjectFeedItem[]>(`${this.apiUrl}/projects/random`, {
      params: { take },
    });
  }
}
