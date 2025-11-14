import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink, RouterLinkActive, NgIf
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);

  get isDashboard(): boolean {
    return this.router.url.startsWith('/dashboard');
  }
}
