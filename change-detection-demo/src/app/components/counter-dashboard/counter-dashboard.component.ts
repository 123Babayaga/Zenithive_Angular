import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../counter/counter.component';
import { DataService } from '../../services/data.service';
import { CounterData } from '../../shared/models/counter.model';

@Component({
  selector: 'app-counter-dashboard',
  standalone: true,
  imports: [CommonModule, CounterComponent],
  template: `
    <div class="dashboard">
      <h2>Change Detection Demo</h2>
      
      <div class="counters-container">
        @for (counter of counters; track counter.id) {
          <app-counter [counter]="counter"></app-counter>
        }
      </div>
      
      <div class="controls">
        <h3>Mutable Updates (Won't trigger OnPush)</h3>
        <div class="button-group">
          @for (counter of counters; track counter.id) {
            <button (click)="updateMutable(counter.id)">
              Update Counter #{{ counter.id }}
            </button>
          }
        </div>
        
        <h3>Immutable Updates (Will trigger OnPush)</h3>
        <div class="button-group">
          @for (counter of counters; track counter.id) {
            <button class="primary" (click)="updateImmutable(counter.id)">
              Update Counter #{{ counter.id }}
            </button>
          }
        </div>
        
        <button class="reset" (click)="resetCounters()">Reset All Counters</button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h2 {
      text-align: center;
      margin-bottom: 24px;
    }
    
    .counters-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    
    .controls {
      background-color: #f0f0f0;
      padding: 16px;
      border-radius: 8px;
    }
    
    .button-group {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    
    button {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #e0e0e0;
    }
    
    button.primary {
      background-color: #4285f4;
      color: white;
    }
    
    button.reset {
      background-color: #ea4335;
      color: white;
      padding: 10px 16px;
      margin-top: 16px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterDashboardComponent {
  counters: CounterData[] = [];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit() {
    // Subscribe to counters data
    this.dataService.counters$.subscribe(data => {
      console.log('Dashboard received new counter data');
      this.counters = data;
    });
  }
  
  // This won't trigger change detection in child components
  updateMutable(id: number) {
    console.log(`Updating counter #${id} with MUTABLE strategy`);
    this.dataService.updateCounterMutable(id);
  }
  
  // This will trigger change detection in child components
  updateImmutable(id: number) {
    console.log(`Updating counter #${id} with IMMUTABLE strategy`);
    this.dataService.updateCounterImmutable(id);
  }
  
  resetCounters() {
    console.log('Resetting all counters');
    this.dataService.resetCounters();
  }
}
