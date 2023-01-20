import {createAction, props} from '@ngrx/store';
import {Product} from '../product';

export const toggleProductCode = createAction(
  '[Product] Toggle Product Code' //action type string
);

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ product: Product}>()
);

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product] Initialize Current Product'
);

// amikor ez tüzel, onnan tudja az app, hogy el kell indítani egy http hívást
export const loadProducts = createAction(
  '[Product] Load'
);

export const loadProductsSuccess = createAction(
  '[Product] Load Success',
  props<{products: Product[]}>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Fail',
  props<{error: string}>()
);
