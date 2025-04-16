import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableData } from '../../models/data.model';
import { PerformanceProfilerService } from '../../../core/services/performance-profiler.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <h3 class="table-title">{{ title }}</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of data" [ngClass]="'status-' + row.status">
            <td>{{ row.name }}</td>
            <td>{{ row.value | number:'1.1-1' }}</td>
            <td>
              <div class="status-indicator" [ngClass]="'status-' + row.status">
                {{ row.status }}
              </div>
            </td>
            <td>{{ row.timestamp | date:'medium' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow-x: auto;
    }
    .table-title {
      margin-top: 0;
      margin-bottom: 16px;
      font-size: 18px;
      color: #333333;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table th, .data-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eaeaea;
    }
    .data-table th {
      font-weight: 600;
      color: #666666;
    }
    .status-indicator {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      text-transform: capitalize;
      font-size: 12px;
      font-weight: 500;
    }
    .status-success {
      background-color: rgba(52, 168, 83, 0.1);
      color: #34A853;
    }
    .status-warning {
      background-color: rgba(251, 188, 5, 0.1);
      color: #FBBC05;
    }
    .status-error {
      background-color: rgba(234, 67, 53, 0.1);
      color: #EA4335;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnChanges {
  @Input() data: TableData[] = [];
  @Input() title: string = 'Data Table';

  constructor(private profiler: PerformanceProfilerService) {}

  ngOnChanges() {
    this.profiler.startProfiling('DataTable');
    // Simulate some computation
    const start = performance.now();
    while (performance.now() - start < 2) {
      // Intentionally create a delay to simulate work
    }
    this.profiler.endProfiling('DataTable');
  }
}