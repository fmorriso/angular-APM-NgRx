import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

// showProductCode
const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(
	getProductFeatureState,
	(state) => state.showProductCode
);

// currentProductId
export const getCurrentProductId = createSelector(
	getProductFeatureState,
	(state) => state.currentProductId
);

// currentProduct
export const getCurrentProduct = createSelector(
	getProductFeatureState,
	getCurrentProductId,
	(state, currentProductId) =>
		state.products.find((p) => p.id === currentProductId)
);

// products
export const getProducts = createSelector(
	getProductFeatureState,
	(state) => state.products
);
