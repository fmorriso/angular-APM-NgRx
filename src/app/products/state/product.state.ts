import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
	products: ProductState;
}

import { Product } from '../product';
export interface ProductState {
	showProductCode: boolean;
	currentProduct: Product;
	products: Product[];
}
