import { Injectable } from '@angular/core';
//
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
//
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { Product } from '../product';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProductEffects {
	constructor(private actions$: Actions, private productService: ProductService) {}

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
}
