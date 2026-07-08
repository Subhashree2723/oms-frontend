import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: FormGroup;
  loginAs: 'CUSTOMER' | 'ADMIN' = 'CUSTOMER';
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  setLoginAs(role: 'CUSTOMER' | 'ADMIN') {
    this.loginAs = role;
    this.error = '';
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';

    const expectedRole = this.loginAs === 'ADMIN' ? 'ROLE_ADMIN' : 'ROLE_CUSTOMER';

    this.auth.login(this.form.value).subscribe({
      next: res => {
        this.loading = false;
        if (res.role !== expectedRole) {
          this.error = this.loginAs === 'ADMIN'
            ? "This account isn't an admin account. Switch to \"Customer\" above, or log in with an admin account."
            : "This is an admin account. Switch to \"Admin\" above to continue.";
          this.auth.logout();
          return;
        }
        this.router.navigate([res.role === 'ROLE_ADMIN' ? '/admin/dashboard' : '/shop']);
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }
}
