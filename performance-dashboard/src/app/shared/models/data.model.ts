export interface ChartData {
    id: string;
    name: string;
    values: number[];
    color: string;
  }
  
  export interface TableData {
    id: string;
    name: string;
    value: number;
    status: 'success' | 'warning' | 'error';
    timestamp: Date;
  }
  
  export interface PerformanceMetric {
    name: string;
    value: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
    changePercent: number;
  }