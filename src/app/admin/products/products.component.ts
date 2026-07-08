import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { Product, Category } from '../../core/models/models';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  form: Product = { name: '', categoryId: 0, price: 0, gstPercent: 0, description: '', active: true };
  editingId: number | null = null;
  error = '';
  selectedFile: File | null = null;

  constructor(private productSvc: ProductService, private categorySvc: CategoryService) {}

  ngOnInit(): void {
    this.categorySvc.getAll().subscribe(list => this.categories = list);
    this.load();
  }

  load() {
    this.productSvc.getAll().subscribe(list => this.products = list);
  }

  save() {
    this.error = '';
    const req = this.editingId
      ? this.productSvc.update(this.editingId, this.form)
      : this.productSvc.create(this.form);

    req.subscribe({
      next: (saved) => {
        if (this.selectedFile && saved.id) {
          this.productSvc.uploadImage(saved.id, this.selectedFile).subscribe(() => this.load());
        }
        this.resetForm();
        this.load();
      },
      error: err => this.error = err.error?.message || 'Save failed'
    });
  }

  edit(p: Product) {
    this.editingId = p.id!;
    this.form = { ...p };
  }

  delete(id: number) {
    if (!confirm('Delete this product?')) return;
    this.productSvc.delete(id).subscribe(() => this.load());
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
  }

  resetForm() {
    this.editingId = null;
    this.selectedFile = null;
    this.form = { name: '', categoryId: 0, price: 0, gstPercent: 0, description: '', active: true };
  }
}
