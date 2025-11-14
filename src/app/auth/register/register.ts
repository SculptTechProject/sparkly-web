import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {AuthService} from '../service/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private auth = inject(AuthService);

  registerForm = new FormGroup({
    displayName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(8)]}),
    confirmPassword: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    acceptTerms: new FormControl(false, {nonNullable: true, validators: [Validators.requiredTrue]}),
  });

  formError: string | null = null;

  isSubmitting = false;

  onSubmit() {
    if (this.registerForm.invalid) {
      this.formError = 'Please fill in all required fields.';
      return;
    }

    this.formError = null;
    this.isSubmitting = true;

    const value = this.registerForm.value;

    this.onSubmit()
    {
      if (this.registerForm.invalid) {
        this.formError = 'Please fill in all required fields.';
        return;
      }

      this.formError = null;
      this.isSubmitting = true;

      const {displayName, email, password} = this.registerForm.getRawValue();

      if (password !== value.confirmPassword) {
        this.formError = "Passwords don't match."
      }

      this.auth.register({
        displayName: displayName!,
        email: email!,
        password: password!,
      }).subscribe({
        next: () => {
          this.isSubmitting = false;
        },
        error: (err) => {
          this.isSubmitting = false;
          this.formError = 'Something went wrong: ' + err.message + '';
        },
      });

      this.isSubmitting = false;
    }
  }
}
