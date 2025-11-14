import {Component, inject} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NgIf } from '@angular/common';
import {AuthResults} from '../models/auth.results';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    identifier: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    //TODO:
    // remember: new FormControl(false, {
    //   nonNullable: true,
    // }),
  });

  formError: string | null = null;
  isSubmitting = false;

  onSubmit(): void {
    if (this.loginForm.invalid){
      this.formError = 'Please fill in all required fields.';
      return;
    }

    this.formError = null;
    this.isSubmitting = true;

    const {identifier, password} = this.loginForm.getRawValue();

    this.auth
      .login
      ({
        identifier: identifier,
        password: password
      })
      .subscribe({
        next: (result: any) => {
          localStorage.setItem('accessToken', result.accessToken);
          this.isSubmitting = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.formError = 'Something went wrong: ' + err.message;
        }
    })
  }
}
