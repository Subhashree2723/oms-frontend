import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  generate(orderId: number): Observable<any> {
    return this.http.post(`${this.base}/admin/invoices/${orderId}/generate`, {});
  }

  download(orderId: number, isAdmin: boolean): Observable<Blob> {
    const path = isAdmin ? `admin/invoices/${orderId}/download` : `customer/invoices/${orderId}/download`;
    return this.http.get(`${this.base}/${path}`, { responseType: 'blob' });
  }
}
