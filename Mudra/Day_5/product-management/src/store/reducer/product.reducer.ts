import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.model';
import {
  filterByCategory,
  getProduct,
  getProductSuccess,
  loadProductFailure,
  loadProducts,
  loadProductSuccess,
} from '../actions/product.actions';

export interface ProductState {
  products: Product[];
  error: any;
  loading: Boolean;
  filterCategories: string[];
  product: any;
}

const initialState: ProductState = {
  products: [],
  error: null,
  loading: true,
  filterCategories: [],
  product: null,
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadProductSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(loadProductFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(filterByCategory, (state, { categories }) => ({
    ...state,
    filterCategories: categories,
    loading: false,
  })),
  on(getProductSuccess, (state, { product }) => ({
    ...state,
    product,
    loading: false,
  })),
  on(getProduct, (state) => ({
    ...state,
    loading: true,
  }))
);
