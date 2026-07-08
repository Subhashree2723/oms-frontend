import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../core/services/category.service';
import { Category } from '../core/models/models';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  categories: Category[] = [];
  selected: Category | null = null;

  constructor(private categorySvc: CategoryService) {}

  ngOnInit(): void {
    this.categorySvc.getTopLevel().subscribe({
      next: list => {
        this.categories = list;
        this.selected = list[0] ?? null;
      },
      error: () => this.categories = []
    });
  }

  select(c: Category) {
    this.selected = c;
  }
}
