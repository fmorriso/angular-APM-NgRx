// Product state
import * as fromRootState from '../../state/app.state';

export interface State extends fromRootState.State {
  products: ProductState;
}

import { Product } from '../product';
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
};
