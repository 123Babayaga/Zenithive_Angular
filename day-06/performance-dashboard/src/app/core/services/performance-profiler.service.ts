import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerformanceProfilerService {
  private renderTimes = new Map<string, number[]>();
  
  startProfiling(componentName: string): void {
    const startTime = performance.now();
    if (!this.renderTimes.has(componentName)) {
      this.renderTimes.set(componentName, []);
    }
    
    console.log(`[Change Detection Started] ${componentName}`);
    
    // Store the start time for this component
    const componentTimes = this.renderTimes.get(componentName)!;
    componentTimes.push(startTime);
  }
  
  endProfiling(componentName: string): void {
    const endTime = performance.now();
    const componentTimes = this.renderTimes.get(componentName);
    
    if (componentTimes && componentTimes.length > 0) {
      const startTime = componentTimes[componentTimes.length - 1];
      const renderTime = endTime - startTime;
      
      console.log(
        `[Change Detection Completed] ${componentName}: ${renderTime.toFixed(2)}ms`
      );
    }
  }
  
  getAverageRenderTime(componentName: string): number {
    const times = this.renderTimes.get(componentName);
    if (!times || times.length === 0) return 0;
    
    const sum = times.reduce((acc, time) => acc + time, 0);
    return sum / times.length;
  }
  
  clearProfilingData(): void {
    this.renderTimes.clear();
  }
}