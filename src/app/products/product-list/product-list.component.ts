import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product-state';

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

	// Used to highlight the selected product in the list
	selectedProduct: Product | null;
	sub: Subscription;

	constructor(
		private store: Store<fromProduct.State>,
		private productService: ProductService
	) {}

	ngOnInit(): void {
		this.sub = this.productService.selectedProductChanges$.subscribe(
			(selectedProduct) => (this.selectedProduct = selectedProduct)
		);

		this.productService.getProducts().subscribe({
			next: (products: Product[]) => (this.products = products),
			error: (err: any) => (this.errorMessage = err.error),
		});

		// subscribe to any changes to the 'products' portion/slice of the NgRx state
		// TODO: Unsubscribe
		this.store
			.pipe(select('products'))
			//
			.subscribe((products) => {
				if (products) {
					this.displayCode = products.showProductCode;
				}
			});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	checkChanged(value: boolean): void {
		// this.displayCode = value;
		this.store.dispatch({
			type: 'TOGGLE_PRODUCT_CODE',
			payload: value,
		});
	}

	newProduct(): void {
		this.productService.changeSelectedProduct(this.productService.newProduct());
	}

	productSelected(product: Product): void {
		this.productService.changeSelectedProduct(product);
	}
}
