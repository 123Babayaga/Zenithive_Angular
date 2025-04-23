import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DashboardComponent } from './features/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, DashboardComponent],
  template: `
    <main>
      <app-dashboard></app-dashboard>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      background-color: #f5f5f5;
      min-height: 100vh;
    }
    main {
      padding: 16px;
    }
  `]
})
export class AppComponent {}
