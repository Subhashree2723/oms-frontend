import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../core/services/issue.service';
import { CustomerIssue, IssueReply } from '../../core/models/models';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {
  issues: CustomerIssue[] = [];
  form: CustomerIssue = { subject: '', description: '' };
  selected: CustomerIssue | null = null;
  replies: IssueReply[] = [];
  error = '';

  constructor(private issueSvc: IssueService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.issueSvc.myIssues().subscribe(list => this.issues = list);
  }

  submit() {
    if (!this.form.subject.trim() || !this.form.description.trim()) return;
    this.issueSvc.create(this.form).subscribe({
      next: () => {
        this.form = { subject: '', description: '' };
        this.load();
      },
      error: err => this.error = err.error?.message || 'Could not submit ticket.'
    });
  }

  view(issue: CustomerIssue) {
    this.selected = issue;
    this.issueSvc.getReplies(issue.id!, false).subscribe(list => this.replies = list);
  }
}
