import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';
import { EMPLOYEE_NAV } from '../employee-nav';
import { MenuItem } from '../../core/models/menu-item.model';
import { ROUTES } from '../../core/constants/routes.constants';

/** Employee main menu — feature tiles (stubbed). */
@Component({
  selector: 'app-employee-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BottomNavComponent],
  template: `
    <div class="page-wrapper employee-theme">
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
export class EmployeeMenuComponent {
  private router = inject(Router);
  readonly nav = EMPLOYEE_NAV;

  readonly tiles: MenuItem[] = [
    { label: 'Profile', icon: '👤', route: ROUTES.employee.profile },
    { label: 'Feature 1', icon: '🕑', route: ROUTES.employee.home },
    { label: 'Feature 2', icon: '🚚', route: ROUTES.employee.home },
    { label: 'Feature 3', icon: '📝', route: ROUTES.employee.home },
  ];

  open(tile: MenuItem): void { this.router.navigate(['/' + tile.route]); }
}
