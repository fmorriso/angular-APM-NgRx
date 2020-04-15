// Product reducers
import { initialState, ProductState } from './product.state';
import { ProductActions, ProductActionTypes } from './product.actions';

export function reducer(state = initialState, action: ProductActions): ProductState {
	switch (action.type) {
		//
		case ProductActionTypes.ToggleProductCode:
			// console.log('existing state: ' + JSON.stringify(state));
			// console.log('payload: ' + JSON.stringify(action.payload));
			return {
				...state,
				showProductCode: action.payload,
			};

		case ProductActionTypes.SetCurrentProduct:
			return {
				...state,
				currentProductId: action.payload.id,
			};

		case ProductActionTypes.ClearCurrentProduct:
			return {
				...state,
				currentProductId: null,
			};

		case ProductActionTypes.InitializeCurrentProduct:
			return {
				...state,
				currentProductId: 0,
			};

		case ProductActionTypes.LoadSuccess:
			return {
				...state,
				products: action.payload,
				error: '',
			};

		case ProductActionTypes.LoadFail:
			return {
				...state,
				products: [],
				error: action.payload,
			};

		default:
			return state;
	}
}
