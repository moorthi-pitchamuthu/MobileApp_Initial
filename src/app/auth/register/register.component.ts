import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';
import { LoadingService } from '../../core/services/loading.service';
import { ROUTES } from '../../core/constants/routes.constants';

/** Registration screen (DEMO placeholder — no real account is created). */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslateModule],
  template: `
    <div class="page-wrapper">
      <div class="reg">
        <h1 class="mb-4">{{ 'auth.createAccount' | translate }}</h1>

        <form class="card" (ngSubmit)="submit()">
          <div class="form-group">
            <label class="form-label">Full name</label>
            <input class="form-control" [(ngModel)]="fullName" name="fullName" placeholder="Jane Doe">
          </div>
          <div class="form-group">
            <label class="form-label">{{ 'auth.email' | translate }}</label>
            <input class="form-control" type="email" [(ngModel)]="email" name="email" placeholder="you@example.com">
          </div>
          <div class="form-group">
            <label class="form-label">{{ 'auth.password' | translate }}</label>
            <input class="form-control" type="password" [(ngModel)]="password" name="password" placeholder="••••••••">
          </div>

          <button class="btn btn-primary btn-full" type="submit" [disabled]="loading.isLoading()">
            {{ 'auth.register' | translate }}
          </button>
        </form>

        <p class="text-center text-sm text-muted mt-4">
          <a class="text-primary font-semi" routerLink="/auth/login">‹ {{ 'auth.login' | translate }}</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .reg { padding: var(--space-8) var(--space-4); min-height: 100dvh; display: flex; flex-direction: column; justify-content: center; }
    .reg h1 { font-size: var(--fs-2xl); font-weight: var(--fw-bold); color: var(--text); text-align: center; }
  `]
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private alerts = inject(AlertService);
  private router = inject(Router);
  readonly loading = inject(LoadingService);

  fullName = '';
  email = '';
  password = '';

  async submit(): Promise<void> {
    // TODO: validate + call real registration.
    const res = await this.loading.wrap(
      this.auth.register({ full_name: this.fullName, email: this.email, password: this.password }),
    );
    if (res.success) {
      this.alerts.success('Account created (demo). Please log in.');
      this.router.navigate([ROUTES.auth.login]);
    } else {
      this.alerts.error(res.message ?? 'Registration failed');
    }
  }
}
