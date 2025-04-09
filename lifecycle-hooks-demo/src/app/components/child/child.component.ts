import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DataItem } from '../../services/data.service';
import { GrandchildComponent } from "../grandchild/grandchild.component";

@Component({
  selector: 'app-child',
  imports: [GrandchildComponent],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, 
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  
  @Input() inputData: string = '';
  @Input() items: DataItem[] = [];
  @Output() itemSelected = new EventEmitter<DataItem>();
  
  @ContentChild('projectedContent') projectedContent!: ElementRef;
  @ViewChild('childViewElement') viewElement!: ElementRef;
  
  selectedItem: DataItem | null = null;
  previousItemsLength: number = 0;
  changeDetectionCount: number = 0;
  
  // Properties to demonstrate performance considerations
  expensiveComputationResult: number = 0;
  
  // For the parent component to access logs
  logCallback: ((component: string, event: string, details?: string) => void) | null = null;
  
  constructor() {
    this.logEvent('Child', 'constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.logEvent('Child', 'ngOnChanges');
    
    // React efficiently to input changes
    if (changes['inputData']) {
      const currentValue = changes['inputData'].currentValue;
      const previousValue = changes['inputData'].previousValue;
      const isFirstChange = changes['inputData'].firstChange;
      
      this.logEvent('Child', 'input change', 
        `inputData: ${previousValue} → ${currentValue}${isFirstChange ? ' (first change)' : ''}`);
    }
    
    if (changes['items']) {
      const currentLength = changes['items'].currentValue?.length || 0;
      const previousLength = changes['items'].previousValue?.length || 0;
      
      this.logEvent('Child', 'input change', 
        `items: ${previousLength} items → ${currentLength} items`);
      
      // Reset selectedItem if it was removed
      if (this.selectedItem && !this.items.find(item => item.id === this.selectedItem?.id)) {
        this.selectedItem = null;
        this.logEvent('Child', 'state update', 'Reset selectedItem as it was removed');
      }
    }
  }

  ngOnInit(): void {
    this.logEvent('Child', 'ngOnInit');
    this.previousItemsLength = this.items.length;
    
    // Demonstrate an expensive computation that should only happen once
    this.performExpensiveOperation();
  }

  ngDoCheck(): void {
    this.changeDetectionCount++;
    
    // Let's not spam the log on every change detection cycle
    if (this.changeDetectionCount % 10 === 0) {
      this.logEvent('Child', 'ngDoCheck', `Detection cycle #${this.changeDetectionCount}`);
    }
    
    // Custom change detection logic for complex changes
    if (this.items.length !== this.previousItemsLength) {
      this.logEvent('Child', 'custom detection', 
        `Items length changed: ${this.previousItemsLength} → ${this.items.length}`);
      this.previousItemsLength = this.items.length;
    }
  }

  ngAfterContentInit(): void {
    this.logEvent('Child', 'ngAfterContentInit', 'Content projection initialized');
    // Now safe to access @ContentChild
  }

  ngAfterContentChecked(): void {
    // Avoid logging too frequently to keep the output clean
    if (this.changeDetectionCount % 10 === 0) {
      this.logEvent('Child', 'ngAfterContentChecked');
    }
  }

  ngAfterViewInit(): void {
    this.logEvent('Child', 'ngAfterViewInit', 'View initialized');
    
    // Now safe to access @ViewChild
    if (this.viewElement) {
      const viewText = this.viewElement.nativeElement.textContent;
      this.logEvent('Child', 'view access', 
        `View element text: "${viewText.trim().substring(0, 20)}..."`);
    }
  }

  ngAfterViewChecked(): void {
    // Avoid logging too frequently to keep the output clean
    if (this.changeDetectionCount % 10 === 0) {
      this.logEvent('Child', 'ngAfterViewChecked');
    }
  }

  ngOnDestroy(): void {
    this.logEvent('Child', 'ngOnDestroy', 'Component destroyed, cleaning up resources');
    // Clean up any subscriptions, timers, or other resources
  }

  selectItem(item: DataItem): void {
    this.selectedItem = item;
    this.itemSelected.emit(item);
    this.logEvent('Child', 'user interaction', `Selected item ID: ${item.id}`);
  }

  performExpensiveOperation(): void {
    // Simulate expensive computation that should only be done once
    this.logEvent('Child', 'performance', 'Starting expensive computation');
    
    const startTime = performance.now();
    
    // Simulate work
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i);
    }
    
    const endTime = performance.now();
    this.expensiveComputationResult = result;
    
    this.logEvent('Child', 'performance', 
      `Completed expensive computation in ${(endTime - startTime).toFixed(2)}ms`);
  }

  private logEvent(component: string, event: string, details?: string): void {
    // Forward log to parent if callback is provided
    if (this.logCallback) {
      this.logCallback(component, event, details);
    }
    
    // Always log to console
    console.log(`${component}: ${event}${details ? ' - ' + details : ''}`);
  }
}
