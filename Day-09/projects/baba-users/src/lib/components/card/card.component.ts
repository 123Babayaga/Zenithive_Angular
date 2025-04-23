import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector:'baba-card',
    standalone:true,
    imports:[CommonModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
})

export class CardComponent {
    constructor(private elementRef: ElementRef) {}

    get hasHeaderContent(): boolean {
        return this.elementRef.nativeElement.querySelector('[card-header]') !== null;
      }
      
      get hasFooterContent(): boolean {
        return this.elementRef.nativeElement.querySelector('[card-footer]') !== null;
      }
}