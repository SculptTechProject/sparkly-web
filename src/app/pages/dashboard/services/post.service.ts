import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostFeedItem } from '../types/post.feeditem';
import {environment} from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/posts`;

  // feed for logged user
  getFeed(): Observable<PostFeedItem[]> {
    return this.http.get<PostFeedItem[]>(`${this.baseUrl}/feed`);
  }

  getForProject(projectId: string): Observable<PostFeedItem[]> {
    return this.http.get<PostFeedItem[]>(`${this.baseUrl}/project/${projectId}`);
  }

  // create / update / delete later TODO
}
