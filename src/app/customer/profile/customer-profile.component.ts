import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';
import { CUSTOMER_NAV } from '../customer-nav';
import { AuthService } from '../../core/services/auth.service';

/** Customer profile — current user + logout. */
@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent, BottomNavComponent],
  template: `
    <div class="page-wrapper customer-theme">
      <app-header title="Profile"></app-header>
      <div class="hdr-spacer"></div>

      <div class="screen">
        <div class="screen-inner">
          <div class="card flex items-center gap-3">
            <div class="list-item-avatar">{{ initial() }}</div>
            <div>
              <div class="font-bold">{{ auth.currentUser()?.full_name }}</div>
              <div class="text-sm text-muted">{{ auth.currentUser()?.email }}</div>
              <span class="chip chip-primary mt-2">{{ auth.currentUser()?.user_type }}</span>
            </div>
          </div>

          <button class="btn btn-danger btn-full mt-4" (click)="auth.logout()">
            {{ 'common.logout' | translate }}
          </button>
        </div>
      </div>

      <app-bottom-nav [items]="nav"></app-bottom-nav>
    </div>
  `,
})
export class CustomerProfileComponent {
  readonly auth = inject(AuthService);
  readonly nav = CUSTOMER_NAV;

  initial(): string {
    return (this.auth.currentUser()?.full_name ?? '?').charAt(0).toUpperCase();
  }
}
