import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Login, LoginResponse } from '../../models/auth';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, RouterModule, MatIconModule, MatTooltipModule,

 MatTabsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  
  subdomain: string | null = null;
  loginError: string = '';

  form: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
    password: ['', Validators.required],
  });

  hidePassword = true;

  ngOnInit() {}

  onSubmit(): void {
    let loginData : Login = this.form.value;
 
    this.authService.login(this.form.value)
    .subscribe({
      next: (value: LoginResponse) => {
        this.router.navigate(['dashboard']);
      }, 
      error: e => {
        const statusCode : number = e.status;
        const errorMessage = e.error.message;
        if (statusCode == 403) {
          localStorage.setItem('emailExpiredPassword', loginData.email);
          this.router.navigate(['password-expired']);
        }
        else {
          this.form.get('email')?.setErrors({'loginFailed': true})
          this.form.get('password')?.setErrors({'loginFailed': true})
          this.loginError = errorMessage;
        }
      }
    })
  }
  updateValueAndValidity() {
    this.form.get('email')?.updateValueAndValidity();
    this.form.get('password')?.updateValueAndValidity();
  }
}
