import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1>Welcome to Zenithive Angular</h1>
      <p>A modular, lazy-loaded Angular application example</p>
      
      <div class="feature-cards">
        <div class="card">
          <h2>Admin</h2>
          <p>Manage system settings and users</p>
          <a routerLink="/admin">Go to Admin</a>
        </div>
        
        <div class="card">
          <h2>Products</h2>
          <p>Browse and manage products</p>
          <a routerLink="/products">View Products</a>
        </div>
        
        <div class="card">
          <h2>User Dashboard</h2>
          <p>Manage your profile and settings</p>
          <a routerLink="/user">User Dashboard</a>
        </div>
      </div>
    </div>
  `,
  styles: `
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .feature-cards {
      display: flex;
      gap: 2rem;
      margin-top: 2rem;
      flex-wrap: wrap;
    }
    
    .card {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 1.5rem;
      flex: 1;
      min-width: 250px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .card a {
      display: inline-block;
      margin-top: 1rem;
      background: #1976d2;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      text-decoration: none;
    }
  `
})
export class HomeComponent {}