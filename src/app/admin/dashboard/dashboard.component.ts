import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  summary: any = {};
  loading = true;
  statusKeys: string[] = [];

  constructor(private dashboardSvc: DashboardService) {}

  ngOnInit(): void {
    this.dashboardSvc.summary().subscribe({
      next: data => {
        this.summary = data;
        this.statusKeys = Object.keys(data.ordersByStatus || {});
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
