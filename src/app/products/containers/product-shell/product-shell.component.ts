import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Product } from '../../product';
// RxJs
import { Observable } from 'rxjs';
// NgRx
import { select, Store } from '@ngrx/store';
//
import * as productSelectors from '../../state';
import * as productActions from '../../state/product.actions';
import { State } from '../../state'; // index.ts

@Component({
	templateUrl: './product-shell.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductShellComponent implements OnInit {
	errorMessage$: Observable<string>;
	displayCode$: Observable<boolean>;
	products$: Observable<Product[]>;
	selectedProduct$: Observable<Product>;

	constructor(private store: Store<State>) {}

	ngOnInit(): void {
		this.store.dispatch(new productActions.Load());
		//
		this.products$ = this.store.pipe(select(productSelectors.getProducts));
		this.errorMessage$ = this.store.pipe(select(productSelectors.getError));
		this.selectedProduct$ = this.store.pipe(
			select(productSelectors.getCurrentProduct)
		);
		this.displayCode$ = this.store.pipe(select(productSelectors.getShowProductCode));
	}

	checkChanged(value: boolean): void {
		this.store.dispatch(new productActions.ToggleProductCode(value));
	}

	newProduct(): void {
		this.store.dispatch(new productActions.InitializeCurrentProduct());
	}

	productSelected(product: Product): void {
		this.store.dispatch(new productActions.SetCurrentProduct(product));
	}

	//

	deleteProduct(product: Product): void {
		this.store.dispatch(new productActions.DeleteProduct(product.id));
	}

	clearProduct(): void {
		this.store.dispatch(new productActions.ClearCurrentProduct());
	}
	saveProduct(product: Product): void {
		this.store.dispatch(new productActions.CreateProduct(product));
	}

	updateProduct(product: Product): void {
		this.store.dispatch(new productActions.UpdateProduct(product));
	}
}
