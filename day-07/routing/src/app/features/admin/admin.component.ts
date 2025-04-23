import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="admin-container">
      <h1>Admin Dashboard</h1>
      
      <nav class="admin-nav">
        <a routerLink="dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="users" routerLinkActive="active">Users</a>
        <a routerLink="settings" routerLinkActive="active">Settings</a>
      </nav>
      
      <div class="admin-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: `
    .admin-container {
      padding: 1rem;
    }
    
    .admin-nav {
      margin: 1rem 0;
      padding: 0.5rem 0;
      border-bottom: 1px solid #ddd;
      display: flex;
      gap: 1rem;
    }
    
    .admin-nav a {
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: #333;
    }
    
    .admin-nav a.active {
      background: #1976d2;
      color: white;
      border-radius: 4px;
    }
    
    .admin-content {
      padding: 1rem 0;
    }
  `
})
export class AdminComponent {}