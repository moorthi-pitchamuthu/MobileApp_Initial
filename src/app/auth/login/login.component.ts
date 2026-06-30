import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';
import { LoadingService } from '../../core/services/loading.service';
import { UserRole } from '../../core/constants/app.constants';
import { APP_NAME } from '../../core/constants/app.constants';

/**
 * Login screen (DEMO).
 * Email + password are placeholders; the role selector lets you preview each
 * role's flow. Real auth is wired in AuthService — see its TODOs.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslateModule],
  template: `
    <div class="page-wrapper">
      <div class="login">
        <div class="brand">
          <div class="brand-logo">📱</div>
          <h1>{{ appName }}</h1>
          <p class="text-muted">{{ 'app.tagline' | translate }}</p>
        </div>

        <form class="card" (ngSubmit)="submit()">
          <div class="form-group">
            <label class="form-label">{{ 'auth.email' | translate }}</label>
            <input class="form-control" type="email" [(ngModel)]="email" name="email"
                   placeholder="you@example.com" autocomplete="email">
          </div>

          <div class="form-group">
            <label class="form-label">{{ 'auth.password' | translate }}</label>
            <input class="form-control" type="password" [(ngModel)]="password" name="password"
                   placeholder="••••••••" autocomplete="current-password">
          </div>

          <div class="form-group">
            <label class="form-label">{{ 'auth.selectRole' | translate }}</label>
            <select class="form-control" [(ngModel)]="role" name="role">
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <button class="btn btn-primary btn-full" type="submit" [disabled]="loading.isLoading()">
            {{ 'auth.signIn' | translate }}
          </button>
        </form>

        <p class="text-center text-sm text-muted mt-4">
          {{ 'auth.createAccount' | translate }} —
          <a class="text-primary font-semi" routerLink="/auth/register">{{ 'auth.register' | translate }}</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login { padding: var(--space-8) var(--space-4); display: flex; flex-direction: column; justify-content: center; min-height: 100dvh; }
    .brand { text-align: center; margin-bottom: var(--space-6); }
    .brand-logo { font-size: 56px; margin-bottom: var(--space-2); }
    .brand h1 { font-size: var(--fs-2xl); font-weight: var(--fw-black); color: var(--text); }
  `]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private alerts = inject(AlertService);
  readonly loading = inject(LoadingService);

  email = '';
  password = '';
  role: UserRole = 'customer';
  readonly appName = APP_NAME;

  async submit(): Promise<void> {
    // TODO: add real validation when wiring real auth.
    const res = await this.loading.wrap(this.auth.login(this.email, this.password, this.role));
    if (res.success) {
      this.alerts.success('Welcome, ' + (res.data?.full_name ?? ''));
      this.auth.goHome();
    } else {
      this.alerts.error(res.message ?? 'Login failed');
    }
  }
}
