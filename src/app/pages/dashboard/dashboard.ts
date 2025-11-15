import { Component, inject } from '@angular/core';
import {ProfileService} from '../service/profile.service';
import {Observable, tap} from 'rxjs';
import { MeResult } from '../models/meResult';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, AsyncPipe],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private profileService = inject(ProfileService);

  me$: Observable<MeResult> = this.profileService.me().pipe(
    tap(me => console.log('ME from API:', me))
  );
}
