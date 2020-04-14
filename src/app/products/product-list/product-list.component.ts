import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
// NgRx
import { Store, select } from '@ngrx/store';
import * as fromProductState from '../state/product.state';
import * as productSelectors from '../state/product.selectors';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
	selector: 'pm-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
	pageTitle = 'Products';
	errorMessage: string;

	displayCode: boolean;

	products: Product[];
	componentActive = true;

	// Used to highlight the selected product in the list
	selectedProduct: Product | null;
	products$: Observable<Product[]>;

	constructor(private store: Store<fromProductState.State>, private productService: ProductService) {}

	ngOnInit(): void {
		// listen for Action that changes current Product
		// TODO: Unsubscribe
		this.store
			//
			.pipe(select(productSelectors.getCurrentProduct))
			//
			.subscribe((currentProduct) => (this.selectedProduct = currentProduct));

		// get the array of all available products
		this.store.dispatch(new productActions.Load());
		this.products$ = this.store
			.pipe(
				select(productSelectors.getProducts)
			);
		/*
		this.productService.getProducts().subscribe({
			next: (products: Product[]) => (this.products = products),
			error: (err: any) => (this.errorMessage = err.error),
		});
    */

		// subscribe to any changes to the 'products' portion/slice of the NgRx state
		// TODO: Unsubscribe
		this.store
			.pipe(
				//
				select(productSelectors.getShowProductCode)
			)
			//
			.subscribe(
				//
				(showProductCode) => (this.displayCode = showProductCode)
			);
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
