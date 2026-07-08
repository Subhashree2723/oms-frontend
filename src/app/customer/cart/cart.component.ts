import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  deliveryAddress = '';
  error = '';
  placing = false;

  constructor(public cart: CartService, private orderSvc: OrderService, private router: Router) {}

  updateQty(productId: number, qty: any) {
    this.cart.updateQuantity(productId, Number(qty));
  }

  remove(productId: number) {
    this.cart.remove(productId);
  }

  placeOrder() {
    if (!this.deliveryAddress.trim()) {
      this.error = 'Please enter a delivery address.';
      return;
    }
    if (this.cart.items.length === 0) {
      this.error = 'Your cart is empty.';
      return;
    }
    this.placing = true;
    this.error = '';
    const request = {
      items: this.cart.items.map(i => ({ productId: i.product.id!, quantity: i.quantity })),
      deliveryAddress: this.deliveryAddress
    };
    this.orderSvc.createOrder(request).subscribe({
      next: () => {
        this.placing = false;
        this.cart.clear();
        this.router.navigate(['/my-orders']);
      },
      error: err => {
        this.placing = false;
        this.error = err.error?.message || 'Could not place order.';
      }
    });
  }
}
