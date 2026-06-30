import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';
import { ADMIN_NAV } from '../admin-nav';
import { MenuItem } from '../../core/models/menu-item.model';
import { ROUTES } from '../../core/constants/routes.constants';

/** Admin main menu — tappable feature tiles (all stubbed). */
@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BottomNavComponent],
  template: `
    <div class="page-wrapper admin-theme">
      <app-header title="Main Menu"></app-header>
      <div class="hdr-spacer"></div>

      <div class="screen">
        <div class="screen-inner">
          <div class="menu-grid">
            <!-- TODO: add your real feature screens & route them here -->
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
export class AdminMenuComponent {
  private router = inject(Router);
  readonly nav = ADMIN_NAV;

  readonly tiles: MenuItem[] = [
    { label: 'App / Version', icon: '⚙️', route: ROUTES.admin.appManagement },
    { label: 'Profile', icon: '👤', route: ROUTES.admin.profile },
    { label: 'Feature 1', icon: '📦', route: ROUTES.admin.home },
    { label: 'Feature 2', icon: '📊', route: ROUTES.admin.home },
    { label: 'Feature 3', icon: '🗂️', route: ROUTES.admin.home },
    { label: 'Feature 4', icon: '🔔', route: ROUTES.admin.home },
  ];

  open(tile: MenuItem): void {
    this.router.navigate(['/' + tile.route]);
  }
}
