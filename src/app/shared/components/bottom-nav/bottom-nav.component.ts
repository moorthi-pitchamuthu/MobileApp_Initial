import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../../core/models/menu-item.model';

/**
 * Bottom tab navigation. Fixed to the bottom of the mobile shell.
 *   <app-bottom-nav [items]="navItems"></app-bottom-nav>
 */
@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="nav">
      <a *ngFor="let item of items" class="nav-item"
         [routerLink]="'/' + item.route" routerLinkActive="active">
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </a>
    </nav>
  `,
  styles: [`
    .nav {
      position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
      width: 100%; max-width: var(--max-w); height: var(--nav-h);
      padding-bottom: var(--sab);
      display: flex; background: var(--surface);
      border-top: 1px solid var(--border); z-index: 80;
    }
    .nav-item {
      flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 2px; color: var(--text-faint); font-size: var(--fs-xs); font-weight: var(--fw-medium);
    }
    .nav-icon { font-size: 20px; }
    .nav-item.active { color: var(--primary); }
    .nav-item.active .nav-label { font-weight: var(--fw-bold); }
  `]
})
export class BottomNavComponent {
  @Input() items: MenuItem[] = [];
}
