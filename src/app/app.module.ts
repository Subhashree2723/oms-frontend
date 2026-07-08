import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { PublicNavbarComponent } from './shared/public-navbar/public-navbar.component';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { ImageUrlPipe } from './shared/pipes/image-url.pipe';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

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

import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PublicNavbarComponent,
    NotificationsComponent,
    ImageUrlPipe,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CategoriesComponent,
    ProductsComponent,
    StockComponent,
    OrdersComponent,
    DeliveryComponent,
    IssuesComponent,
    ReportsComponent,
    ShopComponent,
    CartComponent,
    MyOrdersComponent,
    SupportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
