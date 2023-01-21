import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Product} from '../product';
import * as AppState from '../../state/app.state';
import {ProductState} from './product.reducer';
// BARREL file, containing selectors, state interfaces

// product module is lazy loaded, cant be accessed by app.module when initializing
export interface State extends AppState.State {
  products: ProductState;
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState, // elsőnek a selector kell, ami a state egy bizonyos állapotát adja vissza
  state => state.showProductCode // projector fgv
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState, //composing selectors
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      } as Product;
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);
