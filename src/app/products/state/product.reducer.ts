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
				currentProduct: { ...action.payload },
			};

		case ProductActionTypes.ClearCurrentProduct:
			return {
				...state,
				currentProduct: null,
			};

		case ProductActionTypes.InitializeCurrentProduct:
			return {
				...state,
				currentProduct: {
					id: 0,
					productName: '',
					productCode: 'New',
					description: '',
					starRating: 0,
				},
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
