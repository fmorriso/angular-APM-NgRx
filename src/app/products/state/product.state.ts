// Product state
import { Product } from '../product';

export interface ProductState {
	showProductCode: boolean;
	currentProductId: number | null; // NOTE: need to allow null because there is no default current product Id
	products: Product[];
	error: string;
}

export const initialState: ProductState = {
	showProductCode: true,
	currentProductId: null,
	products: [],
	error: '',
};
