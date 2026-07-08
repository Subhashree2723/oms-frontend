import { Component } from '@angular/core';
import { ReportService } from '../../core/services/report.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent {
  from = '';
  to = '';
  customerId: number | null = null;
  productId: number | null = null;
  categoryId: number | null = null;

  constructor(private reportSvc: ReportService) {}

  private buildParams() {
    const params: any = {};
    if (this.from) params.from = this.from;
    if (this.to) params.to = this.to;
    if (this.customerId) params.customerId = this.customerId;
    if (this.productId) params.productId = this.productId;
    if (this.categoryId) params.categoryId = this.categoryId;
    return params;
  }

  private downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportExcel() {
    this.reportSvc.exportExcel(this.buildParams()).subscribe(blob => this.downloadBlob(blob, 'orders-report.xlsx'));
  }

  exportPdf() {
    this.reportSvc.exportPdf(this.buildParams()).subscribe(blob => this.downloadBlob(blob, 'orders-report.pdf'));
  }
}
