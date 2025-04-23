import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceMetric } from '../../models/data.model';
import { PerformanceProfilerService } from '../../../core/services/performance-profiler.service';
import { MetricCardComponent } from '../metric-card/metric-card.component';

@Component({
  selector: 'app-performance-stats',
  standalone: true,
  imports: [CommonModule, MetricCardComponent],
  template: `
    <div class="stats-container">
      <div class="stats-header">
        <h2>{{ title }}</h2>
        <div class="stats-timestamp">Last updated: {{ lastUpdated | date:'medium' }}</div>
      </div>
      <div class="stats-grid">
        <app-metric-card 
          *ngFor="let metric of metrics" 
          [metric]="metric"
        ></app-metric-card>
      </div>
    </div>
  `,
  styles: [`
    .stats-container {
      margin-bottom: 24px;
    }
    .stats-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .stats-header h2 {
      margin: 0;
      font-size: 20px;
      color: #333333;
    }
    .stats-timestamp {
      font-size: 12px;
      color: #666666;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceStatsComponent implements OnChanges {
  @Input() metrics: PerformanceMetric[] = [];
  @Input() title: string = 'Performance Metrics';
  
  lastUpdated = new Date();

  constructor(private profiler: PerformanceProfilerService) {}

  ngOnChanges() {
    this.profiler.startProfiling('PerformanceStats');
    this.lastUpdated = new Date();
    this.profiler.endProfiling('PerformanceStats');
  }
}