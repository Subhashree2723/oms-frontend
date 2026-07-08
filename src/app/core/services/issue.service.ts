import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomerIssue, IssueReply } from '../models/models';

@Injectable({ providedIn: 'root' })
export class IssueService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Customer
  create(dto: CustomerIssue): Observable<CustomerIssue> {
    return this.http.post<CustomerIssue>(`${this.base}/customer/issues`, dto);
  }

  myIssues(): Observable<CustomerIssue[]> {
    return this.http.get<CustomerIssue[]>(`${this.base}/customer/issues`);
  }

  getReplies(issueId: number, isAdmin: boolean): Observable<IssueReply[]> {
    const path = isAdmin ? `admin/issues` : `customer/issues`;
    return this.http.get<IssueReply[]>(`${this.base}/${path}/${issueId}/replies`);
  }

  // Admin
  allIssues(): Observable<CustomerIssue[]> {
    return this.http.get<CustomerIssue[]>(`${this.base}/admin/issues`);
  }

  reply(issueId: number, message: string): Observable<IssueReply> {
    return this.http.post<IssueReply>(`${this.base}/admin/issues/${issueId}/reply`, { message });
  }

  updateStatus(issueId: number, status: string): Observable<CustomerIssue> {
    return this.http.put<CustomerIssue>(`${this.base}/admin/issues/${issueId}/status`, { status });
  }
}
