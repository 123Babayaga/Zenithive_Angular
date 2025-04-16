import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceMetric } from '../../models/data.model';
import { PerformanceProfilerService } from '../../../core/services/performance-profiler.service';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="metric-card">
      <div class="metric-header">{{ metric.name }}</div>
      <div class="metric-value">
        {{ metric.value | number:'1.1-1' }}{{ metric.unit }}
      </div>
      <div class="metric-trend" [ngClass]="getTrendClass()">
        <span class="trend-arrow">{{ getTrendArrow() }}</span>
        {{ metric.changePercent | number:'1.1-1' }}%
      </div>
    </div>
  `,
  styles: [`
    .metric-card {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      min-height: 120px;
    }
    .metric-header {
      font-size: 14px;
      color: #666666;
      margin-bottom: 8px;
    }
    .metric-value {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .metric-trend {
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .trend-up {
      color: #34A853;
    }
    .trend-down {
      color: #EA4335;
    }
    .trend-stable {
      color: #FBBC05;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricCardComponent {
  @Input() metric!: PerformanceMetric;

  constructor(private profiler: PerformanceProfilerService) {}

  ngOnChanges() {
    this.profiler.startProfiling('MetricCard');
    // Simulate some computation
    const start = performance.now();
    while (performance.now() - start < 1) {
      // Intentionally create a small delay to simulate work
    }
    this.profiler.endProfiling('MetricCard');
  }

  getTrendClass(): string {
    return `trend-${this.metric.trend}`;
  }

  getTrendArrow(): string {
    switch (this.metric.trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  }
}
