import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const loadProducts = createAction('loadProduct');

export const loadProductSuccess = createAction(
  'loadProductSuccess',
  props<{ products: any }>()
);

export const loadProductFailure = createAction(
  'loadProductFailure',
  props<{ error: any }>()
);

export const filterByCategory = createAction(
  'filterByCategory',
  props<{ categories: string[] }>()
);

export const getProduct = createAction('getProduct', props<{ id: any }>());

export const getProductSuccess = createAction(
  'getProductSuccess',
  props<{ product: any }>()
);
