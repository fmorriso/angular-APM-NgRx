/* NgRx */
import { createReducer, on, createAction } from '@ngrx/store';
import { ProductState, ProductInitialState } from './product.state';

export const productReducer = createReducer<ProductState>(
  ProductInitialState,
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
    // console.log('existing state: ' + JSON.stringify(state));
    return {
      ...state,
      showProductCode: !state.showProductCode
      // showProductCode: state.showProductCode = false,
    };
  })
);
