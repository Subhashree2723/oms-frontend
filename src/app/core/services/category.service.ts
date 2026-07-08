import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  /** Top-level (nav) categories, each with its subCategories array populated. */
  getTopLevel(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/top-level`);
  }

  getSubCategories(parentId: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/${parentId}/subcategories`);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  create(dto: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/admin`, dto);
  }

  update(id: number, dto: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/admin/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/${id}`);
  }

  uploadImage(id: number, file: File): Observable<Category> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Category>(`${this.baseUrl}/admin/${id}/image`, formData);
  }
}
