import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { AppNotification } from '../../core/models/models';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  notifications: AppNotification[] = [];

  constructor(private notificationSvc: NotificationService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.notificationSvc.getMine().subscribe(list => this.notifications = list);
  }

  markRead(n: AppNotification) {
    if (n.isRead) return;
    this.notificationSvc.markRead(n.id).subscribe(() => n.isRead = true);
  }
}
