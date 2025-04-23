import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ChartData, PerformanceMetric, TableData } from '../../shared/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private chartDataSubject = new BehaviorSubject<ChartData[]>([
    { id: '1', name: 'CPU Usage', values: [45, 52, 38, 60, 55, 50, 42], color: '#4285F4' },
    { id: '2', name: 'Memory Usage', values: [65, 59, 80, 81, 76, 55, 40], color: '#34A853' },
    { id: '3', name: 'Network Traffic', values: [28, 48, 40, 19, 36, 27, 90], color: '#FBBC05' }
  ]);

  private tableDataSubject = new BehaviorSubject<TableData[]>([
    { id: '1', name: 'Server Alpha', value: 95.2, status: 'success', timestamp: new Date() },
    { id: '2', name: 'Server Beta', value: 82.7, status: 'warning', timestamp: new Date() },
    { id: '3', name: 'Server Gamma', value: 65.3, status: 'error', timestamp: new Date() },
    { id: '4', name: 'Server Delta', value: 92.1, status: 'success', timestamp: new Date() },
    { id: '5', name: 'Server Epsilon', value: 88.5, status: 'success', timestamp: new Date() }
  ]);

  private metricsSubject = new BehaviorSubject<PerformanceMetric[]>([
    { name: 'Response Time', value: 235, unit: 'ms', trend: 'down', changePercent: 5.2 },
    { name: 'Requests', value: 1854, unit: 'req/s', trend: 'up', changePercent: 12.5 },
    { name: 'Error Rate', value: 0.8, unit: '%', trend: 'down', changePercent: 3.2 },
    { name: 'CPU Load', value: 45, unit: '%', trend: 'stable', changePercent: 0.5 }
  ]);

  chartData$ = this.chartDataSubject.asObservable().pipe(shareReplay(1));
  tableData$ = this.tableDataSubject.asObservable().pipe(shareReplay(1));
  metrics$ = this.metricsSubject.asObservable().pipe(shareReplay(1));

  // Observable that simulates data updates every 5 seconds
  simulateUpdates$ = interval(5000).pipe(
    map(() => this.updateData())
  );

  updateData(): void {
    // Immutably update chart data
    const newChartData = this.chartDataSubject.value.map(series => {
      const newValues = [...series.values];
      // Remove first value and add a new one
      newValues.shift();
      newValues.push(Math.floor(Math.random() * 100));
      return { ...series, values: newValues };
    });
    this.chartDataSubject.next(newChartData);

    // Immutably update table data
    const newTableData = this.tableDataSubject.value.map(item => {
      const newValue = Math.floor(Math.random() * 30) + 70;
      let status: 'success' | 'warning' | 'error' = 'success';
      if (newValue < 75) status = 'error';
      else if (newValue < 85) status = 'warning';
      return { ...item, value: newValue, status, timestamp: new Date() };
    });
    this.tableDataSubject.next(newTableData);

    // Immutably update metrics
    const newMetrics = this.metricsSubject.value.map(metric => {
      const change = (Math.random() * 20) - 10; // Random change between -10 and 10
      const newValue = Math.max(0, metric.value + (metric.value * change / 100));
      const trend: 'up' | 'down' | 'stable' = 
        change > 2 ? 'up' : (change < -2 ? 'down' : 'stable');
      return { 
        ...metric, 
        value: Number(newValue.toFixed(1)), 
        trend, 
        changePercent: Math.abs(change)
      };
    });
    this.metricsSubject.next(newMetrics);
  }
}
