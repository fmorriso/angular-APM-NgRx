import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../../product';

@Component({
	selector: 'pm-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
	pageTitle = 'Products';
	//
	@Input() errorMessage: string;
	@Input() products: Product[];
	@Input() displayCode: boolean;
	@Input() selectedProduct: Product;
	//
	@Output() checked = new EventEmitter<boolean>();
	@Output() initializeNewProduct = new EventEmitter<void>();
	@Output() selected = new EventEmitter<Product>();

	checkChanged(value: boolean): void {
		this.checked.emit(value);
	}

	newProduct(): void {
		console.log('made it newProduct method in product-list.component.ts');
		this.initializeNewProduct.emit();
	}

	productSelected(product: Product): void {
		console.log('made it productSelected method in product-list.component.ts');
		console.log(JSON.stringify(product));
		this.selected.emit(product);
	}
}
