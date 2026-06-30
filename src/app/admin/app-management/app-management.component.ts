import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';
import { ADMIN_NAV } from '../admin-nav';
import { AlertService } from '../../core/services/alert.service';
import { APP_VERSION } from '../../core/constants/app.constants';

/**
 * Build / App-version management (admin).
 *
 * UI placeholder for editing the `app_config/settings` document that powers the
 * server-down and force-update walls. Saving is stubbed — wire it to
 * FirebaseService.update('app_config','settings', {...}) when ready.
 */
@Component({
  selector: 'app-app-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, BottomNavComponent],
  template: `
    <div class="page-wrapper admin-theme">
      <app-header title="App / Version Management" [showBack]="true"></app-header>
      <div class="hdr-spacer"></div>

      <div class="screen">
        <div class="screen-inner">
          <div class="card">
            <div class="card-title">Current build</div>
            <table class="detail-table" style="width:100%">
              <tr><td class="text-muted">App version</td><td class="text-right font-semi">{{ appVersion }}</td></tr>
              <tr><td class="text-muted">Channel</td><td class="text-right font-semi">Starter / demo</td></tr>
            </table>
          </div>

          <div class="card">
            <div class="card-title">Force update</div>
            <div class="form-group">
              <label class="form-label">Minimum required version</label>
              <input class="form-control" [(ngModel)]="minVersion" name="minVersion" placeholder="e.g. 1.2.0">
            </div>
            <div class="form-group">
              <label class="form-label">Update message</label>
              <input class="form-control" [(ngModel)]="updateMessage" name="updateMessage" placeholder="A new version is available…">
            </div>
          </div>

          <div class="card">
            <div class="card-title">Maintenance mode</div>
            <label class="flex items-center justify-between">
              <span>Enable maintenance (server-down) wall</span>
              <input type="checkbox" [(ngModel)]="maintenanceMode" name="maintenanceMode">
            </label>
            <div class="form-group mt-3">
              <label class="form-label">Maintenance message</label>
              <input class="form-control" [(ngModel)]="maintenanceMessage" name="maintenanceMessage" placeholder="We'll be right back…">
            </div>
          </div>

          <button class="btn btn-primary btn-full" (click)="save()">Save settings</button>
        </div>
      </div>

      <app-bottom-nav [items]="nav"></app-bottom-nav>
    </div>
  `,
})
export class AppManagementComponent {
  private alerts = inject(AlertService);
  readonly nav = ADMIN_NAV;
  readonly appVersion = APP_VERSION;

  // Placeholder model — load real values from app_config/settings when wired.
  minVersion = '';
  updateMessage = '';
  maintenanceMode = false;
  maintenanceMessage = '';

  save(): void {
    // TODO: persist to Firestore app_config/settings via FirebaseService.update(...)
    this.alerts.success('Settings saved (demo — not persisted)');
  }
}
