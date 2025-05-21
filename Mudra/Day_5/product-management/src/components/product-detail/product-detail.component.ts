import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { getProduct } from '../../store/actions/product.actions';
import {
  selectError,
  selectLoading,
  selectProductDetail,
} from '../../store/selector/product.selector';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, DoCheck {
  route: ActivatedRoute = inject(ActivatedRoute);
  store: Store = inject(Store);
  product$!: Observable<Product | null>;
  loading$!: Observable<Boolean>;
  error$!: Observable<any>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.store.dispatch(getProduct({ id }));
  }

  ngDoCheck(): void {
    this.product$ = this.store.select(selectProductDetail);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }
}
