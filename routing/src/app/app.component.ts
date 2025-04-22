import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="app-header">
      <div class="logo">Zenithive Angular</div>
      <nav class="main-nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
        <a routerLink="/products" routerLinkActive="active">Products</a>
        <a routerLink="/admin" routerLinkActive="active">Admin</a>
        <a routerLink="/user" routerLinkActive="active">User Dashboard</a>
      </nav>
      <div class="auth-actions">
        <button *ngIf="!authService.isAuthenticated()" (click)="login()">Login</button>
        <button *ngIf="authService.isAuthenticated()" (click)="logout()">Logout</button>
      </div>
    </header>
    
    <main>
      <router-outlet></router-outlet>
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2025 Zenithive Angular. All rights reserved.</p>
    </footer>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .app-header {
      background: #1976d2;
      color: white;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .logo {
      font-size: 1.25rem;
      font-weight: bold;
    }
    
    .main-nav {
      display: flex;
      gap: 1rem;
    }
    
    .main-nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    
    .main-nav a.active {
      background: rgba(255,255,255,0.2);
    }
    
    .auth-actions button {
      background: transparent;
      border: 1px solid white;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    
    main {
      flex: 1;
    }
    
    .app-footer {
      background: #f5f5f5;
      padding: 1rem;
      text-align: center;
      margin-top: auto;
    }
  `
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  
  login() {
    this.authService.login();
  }
  
  logout() {
    this.authService.logout();
  }
}