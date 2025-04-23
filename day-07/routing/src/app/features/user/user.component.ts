import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="user-container">
      <h1>User Dashboard</h1>
      
      <nav class="user-nav">
        <a routerLink="profile" routerLinkActive="active">Profile</a>
        <a routerLink="orders" routerLinkActive="active">Orders</a>
        <a routerLink="settings" routerLinkActive="active">Settings</a>
      </nav>
      
      <div class="user-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: `
    .user-container {
      padding: 1rem;
    }
    
    .user-nav {
      margin: 1rem 0;
      padding: 0.5rem 0;
      border-bottom: 1px solid #ddd;
      display: flex;
      gap: 1rem;
    }
    
    .user-nav a {
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: #333;
    }
    
    .user-nav a.active {
      background: #1976d2;
      color: white;
      border-radius: 4px;
    }
    
    .user-content {
      padding: 1rem 0;
    }
  `
})
export class UserComponent {}