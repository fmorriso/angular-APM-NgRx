import { Product } from '../product';

/* NgRx */
import * as AppState from '../../state/app.state';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  products: ProductState;
}

// State for this feature (Product)
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export const ProductInitialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};
