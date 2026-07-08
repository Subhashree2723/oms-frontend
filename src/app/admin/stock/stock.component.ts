import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { StockService } from '../../core/services/stock.service';
import { Product } from '../../core/models/models';

@Component({
  selector: 'app-admin-stock',
  templateUrl: './stock.component.html'
})
export class StockComponent implements OnInit {
  products: Product[] = [];
  form = { productId: 0, changeType: 'ADD', quantity: 1, remarks: '' };
  history: any[] = [];
  selectedProductId: number | null = null;
  error = '';
  message = '';

  constructor(private productSvc: ProductService, private stockSvc: StockService) {}

  ngOnInit(): void {
    this.productSvc.getAll().subscribe(list => this.products = list);
  }

  submit() {
    this.error = '';
    this.message = '';
    this.stockSvc.adjust(this.form).subscribe({
      next: () => {
        this.message = 'Stock updated successfully';
        this.productSvc.getAll().subscribe(list => this.products = list);
        if (this.selectedProductId) this.viewHistory(this.selectedProductId);
      },
      error: err => this.error = err.error?.message || 'Update failed'
    });
  }

  viewHistory(productId: number) {
    this.selectedProductId = productId;
    this.stockSvc.history(productId).subscribe(list => this.history = list);
  }
}
