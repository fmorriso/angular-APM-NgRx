// Product reducers
import { initialState, ProductState } from './product.state';

export function reducer(state = initialState, action): ProductState {
	switch (action.type) {
		//
		case 'TOGGLE_PRODUCT_CODE':
			// console.log('existing state: ' + JSON.stringify(state));
			// console.log('payload: ' + JSON.stringify(action.payload));
			return {
				...state,
				showProductCode: action.payload,
			};
		//
		default:
			return state;
	}
}
