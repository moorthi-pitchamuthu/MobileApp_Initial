import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';
import { ADMIN_NAV } from '../admin-nav';

/** Admin dashboard — empty KPI placeholders. Add real metrics here later. */
@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BottomNavComponent],
  template: `
    <div class="page-wrapper admin-theme">
      <app-header title="Dashboard"></app-header>
      <div class="hdr-spacer"></div>

      <div class="screen">
        <div class="screen-inner">
          <!-- TODO: replace these placeholder KPIs with real data -->
          <div class="kpi-grid">
            <div class="kpi-card filled"><div class="kpi-value">—</div><div class="kpi-label">Metric A</div></div>
            <div class="kpi-card"><div class="kpi-value">—</div><div class="kpi-label">Metric B</div></div>
            <div class="kpi-card"><div class="kpi-value">—</div><div class="kpi-label">Metric C</div></div>
            <div class="kpi-card"><div class="kpi-value">—</div><div class="kpi-label">Metric D</div></div>
          </div>

          <div class="card">
            <div class="card-title">Recent activity</div>
            <p class="text-muted text-sm">No data yet — this is a starter dashboard.</p>
          </div>
        </div>
      </div>

      <app-bottom-nav [items]="nav"></app-bottom-nav>
    </div>
  `,
})
export class AdminHomeComponent {
  readonly nav = ADMIN_NAV;
}
