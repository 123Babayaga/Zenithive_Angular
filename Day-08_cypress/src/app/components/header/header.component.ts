import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  template: `
    <header>
      <h1>E2E Demo App</h1>
      <nav *ngIf="authService.isLoggedIn()">
        <button (click)="logout()" class="logout-btn" data-cy="logout-button">Logout</button>
      </nav>
    </header>
  `,
  styles: [`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #f0f0f0;
      border-bottom: 1px solid #ddd;
    }
    h1 {
      margin: 0;
    }
    .logout-btn {
      padding: 0.5rem 1rem;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class HeaderComponent {
  protected authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}