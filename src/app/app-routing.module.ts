import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProductsComponent } from './admin/products/products.component';
import { StockComponent } from './admin/stock/stock.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { DeliveryComponent } from './admin/delivery/delivery.component';
import { IssuesComponent } from './admin/issues/issues.component';
import { ReportsComponent } from './admin/reports/reports.component';

import { ShopComponent } from './customer/products/shop.component';
import { CartComponent } from './customer/cart/cart.component';
import { MyOrdersComponent } from './customer/orders/my-orders.component';
import { SupportComponent } from './customer/issues/support.component';

import { NotificationsComponent } from './shared/notifications/notifications.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Admin routes
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'admin/categories', component: CategoriesComponent, canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'admin/products', component: ProductsComponent, canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'admin/stock', component: StockComponent, canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'admin/orders', component: OrdersComponent, canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'admin/delivery', component: DeliveryComponent, canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'admin/issues', component: IssuesComponent, canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'admin/reports', component: ReportsComponent, canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },

  // Customer routes
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard], data: { role: 'ROLE_CUSTOMER' } },
  { path: 'support', component: SupportComponent, canActivate: [AuthGuard], data: { role: 'ROLE_CUSTOMER' } },

  // Shared
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
