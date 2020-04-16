import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './containers/product-shell/product-shell.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//
import { reducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';

const productRoutes: Routes = [{ path: '', component: ProductShellComponent }];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(productRoutes),
		StoreModule.forFeature('products', reducer),
		EffectsModule.forFeature([ProductEffects]),
	],
	declarations: [ProductShellComponent, ProductListComponent, ProductEditComponent],
})
export class ProductModule {}
