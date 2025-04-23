import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-grandchild',
  imports: [],
  templateUrl: './grandchild.component.html',
  styleUrl: './grandchild.component.scss'
})
export class GrandchildComponent implements OnInit, OnChanges, OnDestroy {
  @Input() parentData: string = '';

  constructor() {
    console.log('GrandChild: constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('GrandChild: ngOnChanges', changes);
  }

  ngOnInit(): void {
    console.log('GrandChild: ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('GrandChild: ngOnDestroy');
  }
}