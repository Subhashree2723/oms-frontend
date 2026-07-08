import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  search(keyword?: string, categoryId?: number): Observable<Product[]> {
    let params: any = {};
    if (keyword) params.keyword = keyword;
    if (categoryId) params.categoryId = categoryId;
    return this.http.get<Product[]>(`${this.baseUrl}/search`, { params });
  }

  create(dto: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/admin`, dto);
  }

  update(id: number, dto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/admin/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/${id}`);
  }

  uploadImage(id: number, file: File): Observable<Product> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Product>(`${this.baseUrl}/admin/${id}/image`, formData);
  }
}
