import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CounterData } from '../shared/models/counter.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Initial data
  private countersSubject = new BehaviorSubject<CounterData[]>([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 }
  ]);

  counters$ = this.countersSubject.asObservable();

  // Method that mutates data (BAD - will not trigger OnPush detection)
  updateCounterMutable(id: number): void {
    const currentData = this.countersSubject.value;
    const counterIndex = currentData.findIndex(c => c.id === id);
    
    if (counterIndex !== -1) {
      // Directly mutating the object
      currentData[counterIndex].value += 1;
      
      // This won't trigger OnPush change detection because the reference hasn't changed
      this.countersSubject.next(currentData);
    }
  }

  // Method that updates data immutably (GOOD - will trigger OnPush detection)
  updateCounterImmutable(id: number): void {
    const currentData = this.countersSubject.value;
    const counterIndex = currentData.findIndex(c => c.id === id);
    
    if (counterIndex !== -1) {
      // Create a new array with new object references
      const newData = currentData.map(counter => {
        if (counter.id === id) {
          // Create a new object with updated value
          return { ...counter, value: counter.value + 1 };
        }
        return counter;
      });
      
      // This will trigger OnPush change detection because the reference has changed
      this.countersSubject.next(newData);
    }
  }

  // Reset all counters
  resetCounters(): void {
    const newData = this.countersSubject.value.map(counter => ({
      ...counter,
      value: 0
    }));
    
    this.countersSubject.next(newData);
  }
}