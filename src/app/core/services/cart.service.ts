import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  items$ = this.itemsSubject.asObservable();

  private loadCart(): CartItem[] {
    const raw = localStorage.getItem('oms_cart');
    return raw ? JSON.parse(raw) : [];
  }

  private persist(items: CartItem[]) {
    localStorage.setItem('oms_cart', JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  add(product: Product, quantity: number = 1) {
    const items = [...this.items];
    const existing = items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.persist(items);
  }

  updateQuantity(productId: number, quantity: number) {
    const items = this.items.map(i => i.product.id === productId ? { ...i, quantity } : i);
    this.persist(items.filter(i => i.quantity > 0));
  }

  remove(productId: number) {
    this.persist(this.items.filter(i => i.product.id !== productId));
  }

  clear() {
    this.persist([]);
  }

  get total(): number {
    return this.items.reduce((sum, i) => {
      const base = i.product.price * i.quantity;
      const gst = base * (i.product.gstPercent / 100);
      return sum + base + gst;
    }, 0);
  }

  get count(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }
}
