import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html'
})
export class PublicNavbarComponent {
  @Input() showSearch = true;
  searchTerm = '';

  constructor(private router: Router) {}

  search() {
    // Public visitors get sent to login; the shop's real search lives
    // behind auth since browsing-then-ordering requires an account.
    this.router.navigate(['/login']);
  }
}
