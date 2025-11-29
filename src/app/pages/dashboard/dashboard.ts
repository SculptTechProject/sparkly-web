import { Component, inject } from '@angular/core';
import {ProfileService} from '../service/profile.service';
import {Observable, tap} from 'rxjs';
import { MeResult } from '../models/meResult';
import {NgIf, AsyncPipe, NgFor, DatePipe} from '@angular/common';
import {ProjectsService} from './services/projects.service';
import {ProjectFeedItem} from './types/project.projectfeeditem';
import {PostFeedItem} from './types/post.feeditem';
import {PostsService} from './services/post.service';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, AsyncPipe, NgFor, DatePipe],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private profileService = inject(ProfileService);
  private projectsService = inject(ProjectsService);
  private postsService = inject(PostsService);

  me$: Observable<MeResult> = this.profileService.me().pipe(
    tap(me => console.log('ME from API:', me))
  );

  projects$: Observable<ProjectFeedItem[]> = this.projectsService
    .random(20)
    .pipe(tap(projects => console.log('Projects from API:', projects)));

  posts$: Observable<PostFeedItem[]> = this.postsService
    .getFeed()
    .pipe(tap(posts => console.log('Posts from API:', posts)));
}
