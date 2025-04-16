import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData } from '../../models/data.model';
import { PerformanceProfilerService } from '../../../core/services/performance-profiler.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <h3 class="chart-title">{{ title }}</h3>
      <div class="chart-canvas">
        
        <div class="chart-lines">
          <div 
            *ngFor="let series of data" 
            class="chart-line"
            [style.background-color]="series.color"
          >
            <div 
              *ngFor="let value of series.values; let i = index" 
              class="chart-point" 
              [style.height.%]="value"
              [style.left.%]="i * (100 / (series.values.length - 1))"
              [style.background-color]="series.color"
            ></div>
          </div>
        </div>
        <div class="chart-legend">
          <div *ngFor="let series of data" class="legend-item">
            <div class="legend-color" [style.background-color]="series.color"></div>
            <div class="legend-name">{{ series.name }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .chart-title {
      margin-top: 0;
      margin-bottom: 16px;
      font-size: 18px;
      color: #333333;
    }
    .chart-canvas {
      height: 200px;
      position: relative;
      border-bottom: 1px solid #eaeaea;
    }
    .chart-lines {
      position: relative;
      height: 100%;
      width: 100%;
    }
    .chart-line {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    .chart-point {
      position: absolute;
      bottom: 0;
      width: 8px;
      border-radius: 50%;
      transform: translate(-50%, 50%);
    }
    .chart-legend {
      display: flex;
      gap: 16px;
      margin-top: 16px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
    .legend-name {
      font-size: 12px;
      color: #666666;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnChanges {
  @Input() data: ChartData[] = [];
  @Input() title: string = 'Chart';

  constructor(private profiler: PerformanceProfilerService) {}

  ngOnChanges() {
    this.profiler.startProfiling('Chart');
    // Simulate some heavier computation
    const start = performance.now();
    while (performance.now() - start < 3) {
      // Intentionally create a delay to simulate work
    }
    this.profiler.endProfiling('Chart');
  }
}
