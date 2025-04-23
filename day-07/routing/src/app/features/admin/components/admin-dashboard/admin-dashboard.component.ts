import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <h2>Admin Dashboard</h2>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">248</div>
          <div class="stat-label">Users</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">1,834</div>
          <div class="stat-label">Products</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">67</div>
          <div class="stat-label">Orders Today</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">$4,285</div>
          <div class="stat-label">Revenue Today</div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .dashboard {
      padding: 1rem;
    }
    
    .stats {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .stat-card {
      background: white;
      border-radius: 8px;
      padding: 1.25rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      min-width: 150px;
      flex: 1;
    }
    
    .stat-value {
      font-size: 1.75rem;
      font-weight: bold;
      color: #1976d2;
    }
    
    .stat-label {
      font-size: 0.9rem;
      color: #666;
      margin-top: 0.25rem;
    }
  `
})
export class AdminDashboardComponent {}