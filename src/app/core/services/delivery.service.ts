import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Delivery } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DeliveryService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  allAdmin(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.base}/admin/delivery`);
  }

  getForOrder(orderId: number, isAdmin: boolean): Observable<Delivery> {
    const path = isAdmin ? `admin/delivery/${orderId}` : `customer/delivery/${orderId}`;
    return this.http.get<Delivery>(`${this.base}/${path}`);
  }

  updateStatus(orderId: number, status: string, notes?: string): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.base}/admin/delivery/${orderId}/status`, { status, notes });
  }
}
