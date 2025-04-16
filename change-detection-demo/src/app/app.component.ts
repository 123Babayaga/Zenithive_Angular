import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterDashboardComponent } from './components/counter-dashboard/counter-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CounterDashboardComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>Angular Change Detection Demo</h1>
      </header>
      
      <main>
        <app-counter-dashboard></app-counter-dashboard>
      </main>
      
      <footer>
        <p>Open the console to see change detection logs</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    header {
      background-color: #3949ab;
      color: white;
      padding: 16px;
      text-align: center;
    }
    
    h1 {
      margin: 0;
    }
    
    main {
      padding: 20px;
    }
    
    footer {
      text-align: center;
      margin-top: 40px;
      padding: 16px;
      background-color: #f5f5f5;
      color: #666;
    }
  `]
})
export class AppComponent {}