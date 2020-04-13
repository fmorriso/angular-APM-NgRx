import * as fromRootState from '../../state/app.state';

export interface State extends fromRootState.State {
	products: ProductState;
}

import { Product } from '../product';
export interface ProductState {
	showProductCode: boolean;
	currentProductId: number | null;
	// currentProduct: Product;
	products: Product[];
}

export const initialState: ProductState = {
	showProductCode: true,
	currentProductId: null,
	products: [],
};
