import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { CartService } from '../../core/services/cart.service';
import { Product, Category } from '../../core/models/models';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  topCategories: Category[] = [];
  selectedTop: Category | null = null;

  keyword = '';
  categoryId: number | null = null;
  addedMessage = '';

  constructor(private productSvc: ProductService, private categorySvc: CategoryService, private cart: CartService) {}

  ngOnInit(): void {
    this.categorySvc.getTopLevel().subscribe(list => {
      this.topCategories = list;
      this.selectedTop = list[0] ?? null;
    });
    this.search();
  }

  selectTop(c: Category) {
    this.selectedTop = c;
    this.categoryId = null;
    this.search();
  }

  search() {
    this.productSvc.search(this.keyword || undefined, this.categoryId || undefined)
      .subscribe(list => this.products = list.filter(p => p.active));
  }

  selectSubCategory(id: number) {
    this.categoryId = this.categoryId === id ? null : id;
    this.search();
  }

  addToCart(product: Product) {
    this.cart.add(product, 1);
    this.addedMessage = `${product.name} added to cart`;
    setTimeout(() => this.addedMessage = '', 1500);
  }
}
