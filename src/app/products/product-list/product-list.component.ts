import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
// NgRx
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
//
import * as fromProductState from '../state/product.state';
import * as productSelectors from '../state/product.selectors';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
	selector: 'pm-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
	pageTitle = 'Products';
	errorMessage: string;
	errorMessage$: Observable<string>;
	componentActive = true;
	displayCode: boolean;

	products$: Observable<Product[]>;

	// Used to highlight the selected product in the list
	selectedProduct: Product | null;

	constructor(private store: Store<fromProductState.State>) {}

	ngOnInit(): void {
		// Do NOT subscribe here because it uses an async pipe
		// This gets the initial values until the load is complete.
		this.products$ = this.store.pipe(
			select(productSelectors.getProducts)
		) as Observable<Product[]>;

		// Do NOT subscribe here because it used an async pipe
		this.errorMessage$ = this.store.pipe(select(productSelectors.getError));

		this.store.dispatch(new productActions.Load());

		// Subscribe here because it does not use an async pipe
		this.store
			.pipe(
				select(productSelectors.getCurrentProduct),
				takeWhile(() => this.componentActive)
			)
			.subscribe((currentProduct) => (this.selectedProduct = currentProduct));

		// Subscribe here because it does not use an async pipe
		this.store
			.pipe(
				select(productSelectors.getShowProductCode),
				takeWhile(() => this.componentActive)
			)
			.subscribe((showProductCode) => (this.displayCode = showProductCode));
	}

	ngOnDestroy(): void {
		this.componentActive = false;
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
}
