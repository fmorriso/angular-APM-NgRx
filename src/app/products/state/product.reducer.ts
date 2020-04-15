// Product reducers
import { initialState, ProductState } from './product.state';
import { ProductActions, ProductActionTypes } from './product.actions';
import { Product } from '../product';

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

		case ProductActionTypes.UpdateProductSuccess:
			// build a new Product[] via the .map() operator.
			// For each Product, use either the updated product (action.payload) or the unchanged existing product (item)
			const updatedProducts = state.products.map((item: Product) =>
				action.payload.id === item.id ? action.payload : item
			);
			// replace the state with all the old state plus the updated set of products and the current product Id
			return {
				...state,
				products: updatedProducts,
				currentProductId: action.payload.id,
				error: '',
			};

		case ProductActionTypes.UpdateProductFail:
			return {
				...state,
				error: action.payload, // NOTE: the payload is a string containing the error message
			};

		// After a create, the currentProduct is the new product.
		case ProductActionTypes.CreateProductSuccess:
			return {
				...state,
				products: [...state.products, action.payload],
				currentProductId: action.payload.id,
				error: '',
			};

		case ProductActionTypes.CreateProductFail:
			return {
				...state,
				error: action.payload,
			};

		// After a delete, the currentProduct is null.
		// NOTE: action.payload is the Id number of the product just deleted
		//       which we use to build a new Product[] array with every Product EXCEPT the one we just deleted.
		case ProductActionTypes.DeleteProductSuccess:
			return {
				...state,
				products: state.products.filter((product) => product.id !== action.payload),
				currentProductId: null,
				error: '',
			};

		// NOTE: action.payload will have the error message
		case ProductActionTypes.DeleteProductFail:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
}
