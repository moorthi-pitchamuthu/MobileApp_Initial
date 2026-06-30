import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { EMPLOYEE_NAV } from '../employee-nav';

/** Employee dashboard — empty placeholders. */
@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BottomNavComponent, EmptyStateComponent],
  template: `
    <div class="page-wrapper employee-theme">
      <app-header title="Dashboard"></app-header>
      <div class="hdr-spacer"></div>

      <div class="screen">
        <div class="screen-inner">
          <div class="kpi-grid">
            <div class="kpi-card filled"><div class="kpi-value">—</div><div class="kpi-label">Metric A</div></div>
            <div class="kpi-card"><div class="kpi-value">—</div><div class="kpi-label">Metric B</div></div>
          </div>

          <!-- TODO: add employee-facing content here -->
          <app-empty-state icon="📋" text="Your tasks will appear here"></app-empty-state>
        </div>
      </div>

      <app-bottom-nav [items]="nav"></app-bottom-nav>
    </div>
  `,
})
export class EmployeeHomeComponent {
  readonly nav = EMPLOYEE_NAV;
}
