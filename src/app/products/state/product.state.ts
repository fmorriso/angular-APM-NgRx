// Product state
import { Product } from '../product';
import * as fromRootState from '../../state/app.state';

export interface State extends fromRootState.State {
	products: ProductState;
}

export interface ProductState {
	showProductCode: boolean;
	currentProduct: Product;
	products: Product[];
	error: string;
}

export const initialState: ProductState = {
	showProductCode: true,
	currentProduct: null,
	products: [],
	error: '',
};
