// Product Effects service
import { Injectable } from '@angular/core';
// RxJs
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
// NgRx
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
//
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { Product } from '../product';

@Injectable()
export class ProductEffects {
	constructor(private productService: ProductService, private actions$: Actions) {}

	// load the Product[] array
	@Effect()
	loadProducts$ = this.actions$.pipe(
		ofType(productActions.ProductActionTypes.Load),
		mergeMap((action: productActions.Load) =>
			this.productService
				.getProducts()
				//
				.pipe(
					map((products: Product[]) => new productActions.LoadSuccess(products)),
					catchError((err) => of(new productActions.LoadFail(err)))
				)
		)
	);

	// Update the current Product by watching for NgRx actions of type UpdateProduct.
	// When the UpdateProduct action occurs,
	@Effect()
	updateProduct$: Observable<Action> = this.actions$
		//
		.pipe(
			ofType(productActions.ProductActionTypes.UpdateProduct),
			map((action: productActions.UpdateProduct) => action.payload), // NOTE: action.payload is a Product instance
			mergeMap((product: Product) =>
				this.productService
					.updateProduct(product)
					// Dispatch Success of Fail actions depending on what happened in the Product Service
					.pipe(
						map(
							(updatedProduct) =>
								new productActions.UpdateProductSuccess(updatedProduct)
						),
						catchError((err) => of(new productActions.UpdateProductFail(err)))
					)
			)
		);
}
