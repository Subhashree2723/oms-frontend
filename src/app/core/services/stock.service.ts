import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StockService {
  private baseUrl = `${environment.apiUrl}/admin/stock`;

  constructor(private http: HttpClient) {}

  adjust(payload: { productId: number; changeType: string; quantity: number; remarks?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/adjust`, payload);
  }

  history(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history/${productId}`);
  }
}
