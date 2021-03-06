// Product Effects service
import { Injectable } from '@angular/core';
// RxJs
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

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
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap(action =>
      this.productService.getProducts().pipe(
        map(products => (new productActions.LoadSuccess(products))),
        catchError(err => of(new productActions.LoadFail(err)))
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
					//
					.pipe(
						map(
							(updatedProduct) =>
								new productActions.UpdateProductSuccess(updatedProduct)
						),
						catchError((err) => of(new productActions.UpdateProductFail(err)))
					)
			)
		);

	@Effect()
	createProduct$: Observable<Action> = this.actions$
		//
		.pipe(
			ofType(productActions.ProductActionTypes.CreateProduct),
			map((action: productActions.CreateProduct) => action.payload), // NOTE: action.payload is a Product instance
			mergeMap((product: Product) =>
				this.productService
					.createProduct(product)
					//
					.pipe(
						map((newProduct) => new productActions.CreateProductSuccess(newProduct)),
						catchError((err) => of(new productActions.CreateProductFail(err)))
					)
			)
		);

	@Effect()
	deleteProduct$: Observable<Action> = this.actions$
		//
		.pipe(
			ofType(productActions.ProductActionTypes.DeleteProduct),
			map((action: productActions.DeleteProduct) => action.payload),
			mergeMap((productId: number) =>
				this.productService
					.deleteProduct(productId)
					//
					.pipe(
						map(() => new productActions.DeleteProductSuccess(productId)),
						catchError((err) => of(new productActions.DeleteProductFail(err)))
					)
			)
		);
}
