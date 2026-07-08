import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/models';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  form: Category = { name: '', description: '', parentId: null };
  editingId: number | null = null;
  error = '';
  selectedFile: File | null = null;

  constructor(private categorySvc: CategoryService) {}

  ngOnInit(): void {
    this.load();
  }

  /** Top-level categories only, for the "Parent Category" dropdown. */
  get topLevelOptions(): Category[] {
    return this.categories.filter(c => !c.parentId);
  }

  parentName(c: Category): string | null {
    if (!c.parentId) return null;
    return this.categories.find(p => p.id === c.parentId)?.name ?? null;
  }

  load() {
    this.categorySvc.getAll().subscribe(list => this.categories = list);
  }

  save() {
    this.error = '';
    const req = this.editingId
      ? this.categorySvc.update(this.editingId, this.form)
      : this.categorySvc.create(this.form);

    req.subscribe({
      next: (saved) => {
        if (this.selectedFile && saved.id) {
          this.categorySvc.uploadImage(saved.id, this.selectedFile).subscribe(() => {
            this.resetForm();
            this.load();
          });
        } else {
          this.resetForm();
          this.load();
        }
      },
      error: err => this.error = err.error?.message || 'Save failed'
    });
  }

  edit(cat: Category) {
    this.editingId = cat.id!;
    this.form = { name: cat.name, description: cat.description, imageUrl: cat.imageUrl, parentId: cat.parentId ?? null };
  }

  delete(id: number) {
    if (!confirm('Delete this category?')) return;
    this.categorySvc.delete(id).subscribe(() => this.load());
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
  }

  resetForm() {
    this.editingId = null;
    this.selectedFile = null;
    this.form = { name: '', description: '', parentId: null };
  }
}
