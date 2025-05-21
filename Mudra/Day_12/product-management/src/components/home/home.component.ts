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
// import { loadProducts } from '../../store/actions/product.actions';
// import {
//   selectAllProducts,
//   selectError,
//   selectFilteredProducts,
//   selectLoading,
// } from '../../store/selector/product.selector';
import { Observable, take } from 'rxjs';
// import { ProductCardsComponent } from '../product-cards/product-cards.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/product.model';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Apollo } from 'apollo-angular';
import { GET_PRODUCTS } from '../../services/query';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ScrollingModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, DoCheck, AfterViewInit {
  // store: Store = inject(Store);
  products$!: Observable<Product[]>;
  product: any[] = [];
  loading$: any;
  error$: any;
  items = Array.from({ length: 1000 }).map((_, i) => `Item #${i + 1}`);
  // apollo = inject(Apollo);

  constructor() // @Inject(PLATFORM_ID) private platformId: Object,
  // private apollo: Apollo
  {}

  ngOnInit(): void {
    // this.store.dispatch(loadProducts());
    // this.apollo.watchQuery({ query: GET_PRODUCTS }).valueChanges.subscribe({
    //   next: (result: any) => {
    //     console.log('Products:', result.data.products);
    //     this.product = result.data.products;
    //   },
    //   error: (error) => {
    //     console.error('GraphQL Error:', error);
    //   },
    // });
  }

  ngDoCheck(): void {
    // this.loading$ = this.store.select(selectLoading);
    // this.products$ = this.store.select(selectFilteredProducts);
    // this.error$ = this.store.select(selectError);
    // console.log('docheck');
  }

  ngAfterViewInit(): void {
    // const div = document.getElementsByClassName(
    //   'cdk-virtual-scroll-content-wrapper'
    // )[0] as HTMLElement;
    // div.style.display = 'flex';
  }
}
