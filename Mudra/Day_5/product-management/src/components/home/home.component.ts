import {
  Component,
  DoCheck,
  inject,
  OnInit,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../store/actions/product.actions';
import {
  selectAllProducts,
  selectError,
  selectFilteredProducts,
  selectLoading,
} from '../../store/selector/product.selector';
import { Observable, take } from 'rxjs';
import { ProductCardsComponent } from '../product-cards/product-cards.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/product.model';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  imports: [ProductCardsComponent, CommonModule, ScrollingModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, DoCheck, AfterViewInit {
  store: Store = inject(Store);
  products$!: Observable<Product[]>;
  loading$: any;
  error$: any;
  items = Array.from({ length: 1000 }).map((_, i) => `Item #${i + 1}`);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  ngDoCheck(): void {
    this.loading$ = this.store.select(selectLoading);
    this.products$ = this.store.select(selectFilteredProducts);
    this.error$ = this.store.select(selectError);
    console.log('docheck');
  }

  ngAfterViewInit(): void {
    const div = document.getElementsByClassName(
      'cdk-virtual-scroll-content-wrapper'
    )[0] as HTMLElement;
    div.style.display = 'flex';
  }
}
