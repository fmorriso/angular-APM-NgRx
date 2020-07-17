import { createReducer, on, createAction } from '@ngrx/store';
import { UserInitialState, UserState } from './user.state';

export const userReducer = createReducer<UserState>(
  UserInitialState,
  on(createAction('[User] Mask User Name'), (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);
