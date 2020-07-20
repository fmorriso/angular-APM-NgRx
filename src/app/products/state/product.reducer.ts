// Product reducers
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
//
import { initialState, ProductState } from './product.state';
import * as ProductActions from './product.actions';

export const productReducer = createReducer<ProductState>(
  initialState,
  //
  on(ProductActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  //
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product
    };
  }),
  //
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: null
    };
  }),
  //
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    };
  })

);
