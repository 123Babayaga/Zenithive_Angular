import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            [(ngModel)]="email" 
            required 
            data-cy="email-input"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            [(ngModel)]="password" 
            required
            data-cy="password-input"
          >
        </div>
        <div class="error" *ngIf="error">{{error}}</div>
        <button 
          type="submit" 
          [disabled]="!loginForm.form.valid"
          data-cy="login-button"
        >
          Login
        </button>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #cccccc;
    }
    .error {
      color: red;
      margin-bottom: 1rem;
    }
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.error = '';
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid email or password';
    }
  }
}
