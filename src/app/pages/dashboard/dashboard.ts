import { Component, inject } from '@angular/core';
import {ProfileService} from '../service/profile.service';
import {Observable, tap} from 'rxjs';
import { MeResult } from '../models/meResult';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import {ProjectsService} from './services/projects.service';
import {ProjectFeedItem} from './types/project.projectfeeditem';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, AsyncPipe, NgFor],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private profileService = inject(ProfileService);
  private projectsService = inject(ProjectsService);

  me$: Observable<MeResult> = this.profileService.me().pipe(
    tap(me => console.log('ME from API:', me))
  );

  projects$: Observable<ProjectFeedItem[]> = this.projectsService
    .random(20)
    .pipe(tap(projects => console.log('Projects from API:', projects)));
}
