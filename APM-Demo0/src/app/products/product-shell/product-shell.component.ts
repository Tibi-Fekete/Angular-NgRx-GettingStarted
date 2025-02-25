import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {Store} from '@ngrx/store';
import {getCurrentProduct, getError, getProducts, getShowProductCode, State} from '../state';
import {Observable} from 'rxjs';
import {ProductPageActions} from '../state/actions';


@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  public displayCode$: Observable<boolean>;
  public errorMessage$: Observable<string>;
  public products$: Observable<Product[]>;
  public selectedProduct$: Observable<Product>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({currentProductId: product.id}));
  }
}
