import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-cards',
  imports: [RouterLink],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardsComponent implements OnInit, DoCheck {
  @Input() product!: any;

  ngOnInit(): void {
    // console.time('ProductCardsComponent_Render');
  }

  ngDoCheck(): void {
    // console.timeEnd('ProductCardsComponent_Render');
    // console.time('ProductCardsComponent_Render');
    // console.log(performance.now());
  }
}
