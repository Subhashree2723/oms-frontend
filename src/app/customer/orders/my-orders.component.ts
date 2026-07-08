import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { DeliveryService } from '../../core/services/delivery.service';
import { OrderResponse } from '../../core/models/models';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent implements OnInit {
  orders: OrderResponse[] = [];
  selected: OrderResponse | null = null;
  delivery: any = null;

  constructor(
    private orderSvc: OrderService,
    private invoiceSvc: InvoiceService,
    private deliverySvc: DeliveryService
  ) {}

  ngOnInit(): void {
    this.orderSvc.myOrders().subscribe(list => this.orders = list);
  }

  view(order: OrderResponse) {
    this.selected = order;
    this.delivery = null;
    this.deliverySvc.getForOrder(order.id, false).subscribe({
      next: d => this.delivery = d,
      error: () => this.delivery = null
    });
  }

  downloadInvoice(order: OrderResponse) {
    this.invoiceSvc.download(order.id, false).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${order.orderNumber}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
