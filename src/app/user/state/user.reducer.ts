// User reducer
import { initialState, UserState } from './user.state';
import { UserActions, UserActionTypes } from './user.actions';

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    //
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload,
      };

    default:
      return state;
  }
}
