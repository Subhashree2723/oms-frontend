import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../core/services/delivery.service';

@Component({
  selector: 'app-admin-delivery',
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit {
  deliveries: any[] = [];
  statuses = ['PENDING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED'];

  constructor(private deliverySvc: DeliveryService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.deliverySvc.allAdmin().subscribe(list => this.deliveries = list);
  }

  updateStatus(d: any, status: string) {
    this.deliverySvc.updateStatus(d.order.id, status, d.trackingNotes).subscribe(() => this.load());
  }
}
