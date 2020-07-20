import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

// define a slice of the big state that we want to deal with
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// showProductCode
export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

// currentProduct
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  (state) => state.currentProduct
);

// products
export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);
