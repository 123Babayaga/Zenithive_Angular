import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <h1>Login</h1>
      
      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            [(ngModel)]="username" 
            required
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
          >
        </div>
        
        <button type="submit" [disabled]="!loginForm.form.valid">Login</button>
      </form>
      
      <p class="note">
        For demo purposes, you can log in with any credentials.
      </p>
    </div>
  `,
  styles: `
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    button {
      background: #1976d2;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1rem;
      width: 100%;
    }
    
    button:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }
    
    .note {
      margin-top: 1.5rem;
      color: #666;
      font-size: 0.9rem;
      text-align: center;
    }
  `
})
export class LoginComponent {
  username = '';
  password = '';
  returnUrl = '/';
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  onSubmit() {
    // Simple mock login
    this.authService.login();
    this.router.navigateByUrl(this.returnUrl);
  }
}