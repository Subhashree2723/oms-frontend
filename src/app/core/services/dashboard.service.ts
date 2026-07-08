import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private base = `${environment.apiUrl}/admin/dashboard`;

  constructor(private http: HttpClient) {}

  summary(): Observable<any> {
    return this.http.get(`${this.base}/summary`);
  }
}
