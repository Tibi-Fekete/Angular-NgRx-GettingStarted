import {createReducer, on} from '@ngrx/store';
import * as UserActions from './user.actions';
import {UserState} from './index';


const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.maskUserName, (state): UserState => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  }),
  on(UserActions.getCurrentUser, (state): UserState => {
    return {
      ...state,
      currentUser: state.currentUser
    };
  })
);
