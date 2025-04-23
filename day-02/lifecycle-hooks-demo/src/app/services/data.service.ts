import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DataItem {
  id: number;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<DataItem[]>([
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 }
  ]);

  data$ = this.dataSource.asObservable();
  
  private intervalId: any;

  constructor() {
    console.log('DataService: Constructor called');
  }

  startUpdates(interval: number = 3000): void {
    // Clear any existing intervals to prevent duplicates
    this.stopUpdates();
    
    this.intervalId = setInterval(() => {
      const currentData = this.dataSource.value;
      const updatedData = currentData.map(item => ({
        ...item,
        value: Math.floor(item.value + Math.random() * 10)
      }));
      
      this.dataSource.next(updatedData);
      console.log('DataService: Data updated', updatedData);
    }, interval);
    
    console.log(`DataService: Started updates with ${interval}ms interval`);
  }

  stopUpdates(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('DataService: Stopped updates');
    }
  }

  addItem(): void {
    const currentData = this.dataSource.value;
    const newId = currentData.length > 0 ? 
      Math.max(...currentData.map(item => item.id)) + 1 : 1;
    
    const newItem = {
      id: newId,
      value: Math.floor(Math.random() * 100)
    };
    
    this.dataSource.next([...currentData, newItem]);
    console.log('DataService: Item added', newItem);
  }

  removeItem(id: number): void {
    const currentData = this.dataSource.value;
    const updatedData = currentData.filter(item => item.id !== id);
    
    this.dataSource.next(updatedData);
    console.log('DataService: Item removed', id);
  }
}