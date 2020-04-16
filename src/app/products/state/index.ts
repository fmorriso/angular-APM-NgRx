// Index.ts "Barrell"
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { ProductState } from './product.state';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
	products: ProductState;
}

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// showProductCode
export const getShowProductCode = createSelector(
	getProductFeatureState,
	(state) => state.showProductCode
);

// currentProductId
export const getCurrentProductId = createSelector(
	getProductFeatureState,
	(state) => state.currentProductId
);

// currentProduct (depends on currentProductId)
export const getCurrentProduct = createSelector(
	getProductFeatureState,
	getCurrentProductId,
	(state, currentProductId) => {
		if (currentProductId === 0) {
			return {
				id: 0,
				productName: '',
				productCode: 'New',
				description: '',
				starRating: 0,
			};
		} else {
			return currentProductId
				? state.products.find((p) => p.id === currentProductId)
				: null;
		}
	}
);

// products
export const getProducts = createSelector(
	getProductFeatureState,
	(state) => state.products
);

// error
export const getError = createSelector(
	getProductFeatureState,
	(state) => state.error
);
