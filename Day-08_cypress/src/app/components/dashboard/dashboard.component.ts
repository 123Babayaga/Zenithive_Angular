import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h2>Dashboard</h2>
      <div class="welcome-message" data-cy="welcome-message">
        Welcome, {{username}}!
      </div>
      <div class="dashboard-content">
        <div class="card" *ngFor="let item of dashboardItems">
          <h3>{{item.title}}</h3>
          <p>{{item.description}}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 1rem;
    }
    .welcome-message {
      margin-bottom: 2rem;
      padding: 1rem;
      background-color: #e8f5e9;
      border-radius: 4px;
    }
    .dashboard-content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    .card {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class DashboardComponent implements OnInit {
  username: string = '';
  dashboardItems = [
    { title: 'Task Management', description: 'View and manage your tasks' },
    { title: 'Reports', description: 'Access your performance reports' },
    { title: 'Settings', description: 'Configure your account settings' }
  ];

  private authService = inject(AuthService);

  ngOnInit() {
    this.username = this.authService.getCurrentUser()?.name || 'User';
  }
}
