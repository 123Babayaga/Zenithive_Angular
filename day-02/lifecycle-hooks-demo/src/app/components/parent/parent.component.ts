import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataItem, DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { ChildComponent } from "../child/child.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-parent',
  imports: [CommonModule, ChildComponent,FormsModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('parentContent') parentContent!: ElementRef;
  
  items: DataItem[] = [];
  showChild = true;
  childInput = 'Initial Input';
  updateInterval = 3000;
  eventLog: {timestamp: string; component: string; event: string; details?: string}[] = [];
  
  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {
    this.logEvent('Parent', 'constructor');
  }

  ngOnInit(): void {
    this.logEvent('Parent', 'ngOnInit', 'Component initializing');
    
    // Subscribe to data updates
    this.dataService.data$.subscribe(data => {
      this.items = data;
      this.logEvent('Parent', 'data update', `Received ${data.length} items`);
    });
  }

  ngAfterViewInit(): void {
    this.logEvent('Parent', 'ngAfterViewInit', 'View initialized');
    
    // Now safe to access ViewChild
    if (this.parentContent) {
      const contentHeight = this.parentContent.nativeElement.clientHeight;
      this.logEvent('Parent', 'view measurement', `Content height: ${contentHeight}px`);
    }
    
    // If we need to update the view after ngAfterViewInit
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.logEvent('Parent', 'ngOnDestroy', 'Component destroying, cleaning up');
    
    // Clean up by stopping any data updates
    this.stopDataUpdates();
  }

  startDataUpdates(): void {
    this.dataService.startUpdates(this.updateInterval);
    this.logEvent('Parent', 'action', `Started data updates at ${this.updateInterval}ms interval`);
  }

  stopDataUpdates(): void {
    this.dataService.stopUpdates();
    this.logEvent('Parent', 'action', 'Stopped data updates');
  }

  addItem(): void {
    this.dataService.addItem();
    this.logEvent('Parent', 'action', 'Added new item');
  }

  removeItem(id: number): void {
    this.dataService.removeItem(id);
    this.logEvent('Parent', 'action', `Removed item ${id}`);
  }

  toggleChildVisibility(): void {
    this.showChild = !this.showChild;
    this.logEvent('Parent', 'action', `${this.showChild ? 'Showed' : 'Hid'} child component`);
  }

  changeChildInput(): void {
    this.childInput = `Updated Input ${new Date().toLocaleTimeString()}`;
    this.logEvent('Parent', 'action', `Changed child input to "${this.childInput}"`);
  }

  onItemSelected(item: DataItem): void {
    this.logEvent('Parent', 'event handler', `Received itemSelected event with ID: ${item.id}`);
  }

  clearLog(): void {
    this.eventLog = [];
  }

  logEvent(component: string, event: string, details?: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift({ timestamp, component, event, details });
    
    // Keep log at a reasonable size
    if (this.eventLog.length > 100) {
      this.eventLog.pop();
    }
    
    // Log to console for debugging
    console.log(`[${timestamp}] ${component}: ${event}${details ? ' - ' + details : ''}`);
  }
}
