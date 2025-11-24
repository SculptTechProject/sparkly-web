import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  registerForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    acceptTerms: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  formError: string | null = null;
  isSubmitting = false;

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.formError = 'Please fill in all required fields.';
      return;
    }

    this.formError = null;
    this.isSubmitting = true;

    const {
      username,
      email,
      password,
      confirmPassword,
    } = this.registerForm.getRawValue();

    if (password !== confirmPassword) {
      this.isSubmitting = false;
      this.formError = "Passwords don't match.";
      return;
    }

    this.auth
      .register({
        username: username!,
        email: email!,
        password: password!,
      })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.formError = 'Something went wrong: ' + err.message;
        },
      });
  }
}
