import { initialState, UserState } from './user.state';

export function reducer(state = initialState, action): UserState {
	switch (action.type) {
		case 'MASK_USER_NAME':
			return {
				...state,
				maskUserName: action.payload,
			};

		default:
			return state;
	}
}
