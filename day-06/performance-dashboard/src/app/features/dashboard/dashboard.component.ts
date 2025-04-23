import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { DataService } from '../../core/services/data.service';
import { ChartData, PerformanceMetric, TableData } from '../../shared/models/data.model';
import { Subscription } from 'rxjs';
import { PerformanceStatsComponent } from '../../shared/components/performance-stats/performance-stats.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartComponent,
    DataTableComponent,
    PerformanceStatsComponent
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Performance Dashboard</h1>
        <div class="update-toggle">
          <button (click)="toggleAutoUpdate()">
            {{ isAutoUpdating ? 'Pause Updates' : 'Resume Updates' }}
          </button>
          <button class="secondary" (click)="forceUpdate()">
            Force Update
          </button>
        </div>
      </div>

      <app-performance-stats
        [metrics]="metrics"
        title="Key Performance Indicators"
      ></app-performance-stats>

      <div class="dashboard-row">
        <app-chart 
          [data]="chartData" 
          title="System Metrics"
        ></app-chart>
      </div>

      <div class="dashboard-row">
        <app-data-table 
          [data]="tableData" 
          title="Server Status"
        ></app-data-table>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .dashboard-header h1 {
      margin: 0;
      font-size: 24px;
      color: #333333;
    }
    .update-toggle {
      display: flex;
      gap: 8px;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background-color: #4285F4;
      color: white;
      cursor: pointer;
      font-weight: 500;
    }
    button.secondary {
      background-color: #f1f3f4;
      color: #333333;
    }
    button:hover {
      opacity: 0.9;
    }
    .dashboard-row {
      margin-bottom: 24px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  chartData: ChartData[] = [];
  tableData: TableData[] = [];
  metrics: PerformanceMetric[] = [];
  isAutoUpdating = true;
  
  private updateSubscription?: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {

    this.dataService.chartData$.subscribe(data => {
      this.chartData = data;
    });
    
    this.dataService.tableData$.subscribe(data => {
      this.tableData = data;
    });
    
    this.dataService.metrics$.subscribe(data => {
      this.metrics = data;
    });
    
    // Start auto-updates
    this.startAutoUpdate();
  }

  ngOnDestroy(): void {
    this.stopAutoUpdate();
  }

  startAutoUpdate(): void {
    this.isAutoUpdating = true;
    this.updateSubscription = this.dataService.simulateUpdates$.subscribe();
  }

  stopAutoUpdate(): void {
    this.isAutoUpdating = false;
    this.updateSubscription?.unsubscribe();
  }

  toggleAutoUpdate(): void {
    if (this.isAutoUpdating) {
      this.stopAutoUpdate();
    } else {
      this.startAutoUpdate();
    }
  }

  forceUpdate(): void {
    this.dataService.updateData();
  }
}
