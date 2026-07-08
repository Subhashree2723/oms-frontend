import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    const requiredRole = route.data['role'] as string | undefined;
    if (requiredRole && this.auth.currentUser?.role !== requiredRole) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
