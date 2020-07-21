// User reducer
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
//
import { initialState, UserState } from './user.state';
import * as UserActions from './user.actions';


export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.maskUserName, (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);
