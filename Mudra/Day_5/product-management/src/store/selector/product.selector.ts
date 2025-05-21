import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducer/product.reducer';

export const ProductFeatureSelector =
  createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  ProductFeatureSelector,
  (state) => state.products
);

export const selectError = createSelector(
  ProductFeatureSelector,
  (state) => state.error
);

export const selectLoading = createSelector(
  ProductFeatureSelector,
  (state) => state.loading
);

export const selectFilterCategories = createSelector(
  ProductFeatureSelector,
  (state) => state.filterCategories
);

export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectFilterCategories,
  (products, selectedCategories) => {
    if (!selectedCategories || selectedCategories.length === 0) return products;
    return products.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }
);

export const selectProductDetail = createSelector(
  ProductFeatureSelector,
  (state) => state.product
);
