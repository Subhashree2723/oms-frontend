import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { OrderResponse, ORDER_STATUSES } from '../../core/models/models';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders: OrderResponse[] = [];
  statuses = ORDER_STATUSES;
  filterStatus = '';
  selected: OrderResponse | null = null;

  constructor(private orderSvc: OrderService, private invoiceSvc: InvoiceService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.orderSvc.allOrders(this.filterStatus || undefined).subscribe(list => this.orders = list);
  }

  view(order: OrderResponse) {
    this.selected = order;
  }

  updateStatus(order: OrderResponse, status: string) {
    this.orderSvc.updateStatus(order.id, status).subscribe(() => this.load());
  }

  downloadInvoice(order: OrderResponse) {
    this.invoiceSvc.download(order.id, true).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${order.orderNumber}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
