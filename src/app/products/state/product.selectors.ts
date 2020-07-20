import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

// showProductCode
const getProductFeatureState = createFeatureSelector<ProductState>('products');
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
