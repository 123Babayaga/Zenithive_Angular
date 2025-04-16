import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterData } from '../../shared/models/counter.model';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="counter-card" [ngClass]="{'highlight': highlighted}">
      <h3>Counter #{{ counter.id }}</h3>
      <div class="counter-value">{{ counter.value }}</div>
      <div class="render-count">Render count: {{ renderCount }}</div>
      <button (click)="forceUpdate()">Force Update</button>
    </div>
  `,
  styles: [`
    .counter-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
      text-align: center;
      background-color: #f9f9f9;
      transition: background-color 0.3s;
    }
    .counter-value {
      font-size: 24px;
      font-weight: bold;
      margin: 16px 0;
    }
    .render-count {
      font-size: 12px;
      color: #666;
      margin-bottom: 12px;
    }
    .highlight {
      background-color: #ffffcc;
    }
    button {
      padding: 8px 12px;
      background-color: #e0e0e0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  @Input() counter!: CounterData;
  
  renderCount = 0;
  highlighted = false;
  
  constructor(private cd: ChangeDetectorRef) {}
  
  ngOnInit() {
    console.log(`Counter ${this.counter.id} initialized`);
  }
  
  ngOnChanges() {
    // Increment render count whenever inputs change
    this.renderCount++;
    console.log(`Counter ${this.counter.id} rendered: ${this.renderCount} times`);
    
    // Flash highlight effect
    this.highlighted = true;
    setTimeout(() => {
      this.highlighted = false;
      // Need to manually detect changes since we're changing a property
      // outside of Angular's zone
      this.cd.detectChanges();
    }, 300);
  }
  
  forceUpdate() {
    // Manually trigger change detection on this component
    this.cd.detectChanges();
    this.renderCount++;
    console.log(`Counter ${this.counter.id} force updated: ${this.renderCount} times`);
  }
}
