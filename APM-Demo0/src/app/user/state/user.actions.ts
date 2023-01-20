import {createAction} from '@ngrx/store';

export const maskUserName = createAction(
  '[User] Mask User Name'
);

export const getCurrentUser = createAction(
  '[User] Get Current User'
);
