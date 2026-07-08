import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateOrderRequest, OrderResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Customer
  createOrder(request: CreateOrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.base}/customer/orders`, request);
  }

  myOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${this.base}/customer/orders`);
  }

  // Admin
  allOrders(status?: string): Observable<OrderResponse[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<OrderResponse[]>(`${this.base}/admin/orders`, { params });
  }

  getOrder(id: number, isAdmin: boolean): Observable<OrderResponse> {
    const path = isAdmin ? `admin/orders/${id}` : `customer/orders/${id}`;
    return this.http.get<OrderResponse>(`${this.base}/${path}`);
  }

  updateStatus(id: number, status: string): Observable<OrderResponse> {
    return this.http.put<OrderResponse>(`${this.base}/admin/orders/${id}/status`, { status });
  }
}
