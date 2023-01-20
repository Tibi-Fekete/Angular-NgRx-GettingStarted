import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductService} from '../product.service';
import * as ProductActions from './product.actions';
import {catchError, concatMap, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) {
  }

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.createProduct),
      concatMap((action) => this.productService.createProduct(action.product)
        .pipe(
          map((product) => ProductActions.createProductSuccess({product})),
          catchError(error => of(ProductActions.createProductFailure({error})))
        ))
    );
  });

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() => this.productService.getProducts().pipe(
        map((products) => ProductActions.loadProductsSuccess({products})),
        catchError(error => of(ProductActions.loadProductsFailure({error})))
      ))
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe( // responds to any dispatched actions
      ofType(ProductActions.updateProduct), // filter to updateProd action
      concatMap(action => { // higher order mapping operator
        return this.productService.updateProduct(action.product)
          .pipe(
            map(product => ProductActions.updateProductSuccess({product})),
            catchError(error => of(ProductActions.updateProductFailure({error})))
          );
      })
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      concatMap(action => this.productService.deleteProduct(action.productId)
        .pipe(
          map(() => ProductActions.deleteProductSuccess({productId: action.productId})),
          catchError(error => of(ProductActions.deleteProductFailure({error})))
        ))
    );
  });
}
