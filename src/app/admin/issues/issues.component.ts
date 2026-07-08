import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../core/services/issue.service';
import { CustomerIssue, IssueReply } from '../../core/models/models';

@Component({
  selector: 'app-admin-issues',
  templateUrl: './issues.component.html'
})
export class IssuesComponent implements OnInit {
  issues: CustomerIssue[] = [];
  statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  selected: CustomerIssue | null = null;
  replies: IssueReply[] = [];
  replyMessage = '';

  constructor(private issueSvc: IssueService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.issueSvc.allIssues().subscribe(list => this.issues = list);
  }

  open(issue: CustomerIssue) {
    this.selected = issue;
    this.issueSvc.getReplies(issue.id!, true).subscribe(list => this.replies = list);
  }

  sendReply() {
    if (!this.replyMessage.trim() || !this.selected) return;
    this.issueSvc.reply(this.selected.id!, this.replyMessage).subscribe(() => {
      this.replyMessage = '';
      this.open(this.selected!);
      this.load();
    });
  }

  updateStatus(issue: CustomerIssue, status: string) {
    this.issueSvc.updateStatus(issue.id!, status).subscribe(() => this.load());
  }
}
