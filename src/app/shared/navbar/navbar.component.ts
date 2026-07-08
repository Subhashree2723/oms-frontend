import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  unreadCount = 0;
  cartCount = 0;

  constructor(
    public auth: AuthService,
    private notificationSvc: NotificationService,
    public cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user => {
      if (user) this.loadNotifications();
    });
    this.cart.items$.subscribe(items => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    });
  }

  loadNotifications() {
    this.notificationSvc.getMine().subscribe({
      next: list => this.unreadCount = list.filter(n => !n.isRead).length,
      error: () => {}
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
