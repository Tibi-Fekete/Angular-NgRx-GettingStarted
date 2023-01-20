import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {User} from '../user';
import * as UserActions from './user.actions';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

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
