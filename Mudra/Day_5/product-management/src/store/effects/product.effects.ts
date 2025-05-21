import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, createAction } from '@ngrx/store';
import {
  getProduct,
  getProductSuccess,
  loadProductFailure,
  loadProducts,
  loadProductSuccess,
} from '../actions/product.actions';
import { catchError, delay, map, mergeMap, of, switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';

export class productEffects {
  $action: Actions = inject(Actions);
  productService: ProductService = inject(ProductService);

  $loadProducts = createEffect(() =>
    this.$action.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((response) => {
            console.log(response);
            return loadProductSuccess({ products: response });
          }),
          catchError((error) => {
            return of(loadProductFailure(error));
          })
        )
      )
    )
  );

  $getProduct = createEffect(() =>
    this.$action.pipe(
      ofType(getProduct),
      mergeMap(({ id }) =>
        this.productService.getProductDetails(id).pipe(
          map((response) => {
            console.log(response);
            return getProductSuccess({ product: response });
          }),
          catchError((error) => {
            return of(loadProductFailure(error));
          })
        )
      )
    )
  );
}
