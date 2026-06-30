import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';
import { CUSTOMER_NAV } from '../customer-nav';
import { MenuItem } from '../../core/models/menu-item.model';
import { ROUTES } from '../../core/constants/routes.constants';

/** Customer main menu — feature tiles (stubbed). */
@Component({
  selector: 'app-customer-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BottomNavComponent],
  template: `
    <div class="page-wrapper customer-theme">
      <app-header title="Main Menu"></app-header>
      <div class="hdr-spacer"></div>

      <div class="screen">
        <div class="screen-inner">
          <div class="menu-grid">
            <div class="menu-tile" *ngFor="let tile of tiles" (click)="open(tile)">
              <span class="tile-icon">{{ tile.icon }}</span>
              <span class="tile-label">{{ tile.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <app-bottom-nav [items]="nav"></app-bottom-nav>
    </div>
  `,
})
export class CustomerMenuComponent {
  private router = inject(Router);
  readonly nav = CUSTOMER_NAV;

  readonly tiles: MenuItem[] = [
    { label: 'Profile', icon: '👤', route: ROUTES.customer.profile },
    { label: 'Feature 1', icon: '🛒', route: ROUTES.customer.dashboard },
    { label: 'Feature 2', icon: '🧾', route: ROUTES.customer.dashboard },
    { label: 'Feature 3', icon: '🔔', route: ROUTES.customer.dashboard },
  ];

  open(tile: MenuItem): void { this.router.navigate(['/' + tile.route]); }
}
