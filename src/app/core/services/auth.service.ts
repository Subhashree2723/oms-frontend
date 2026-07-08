import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getStoredUser(): AuthResponse | null {
    const raw = localStorage.getItem('oms_auth');
    return raw ? JSON.parse(raw) : null;
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(
      tap(res => this.setSession(res))
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, request).pipe(
      tap(res => this.setSession(res))
    );
  }

  private setSession(auth: AuthResponse) {
    localStorage.setItem('oms_auth', JSON.stringify(auth));
    this.currentUserSubject.next(auth);
  }

  logout() {
    localStorage.removeItem('oms_auth');
    this.currentUserSubject.next(null);
  }

  get currentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return this.currentUser?.token ?? null;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'ROLE_ADMIN';
  }

  get isCustomer(): boolean {
    return this.currentUser?.role === 'ROLE_CUSTOMER';
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}
