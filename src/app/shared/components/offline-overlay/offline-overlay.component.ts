import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NetworkService } from '../../../core/services/network.service';

/** Blocks the UI with a message while the device is offline. */
@Component({
  selector: 'app-offline-overlay',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="offline" *ngIf="!net.isOnline()">
      <div class="offline-card">
        <div class="offline-icon">📡</div>
        <h3>{{ 'status.offline' | translate }}</h3>
        <p>{{ 'status.offlineMsg' | translate }}</p>
      </div>
    </div>
  `,
  styles: [`
    .offline {
      position: fixed; inset: 0; z-index: 9995;
      background: rgba(24,24,27,.55); backdrop-filter: blur(3px);
      display: flex; align-items: center; justify-content: center; padding: var(--space-6);
    }
    .offline-card {
      background: var(--surface); border-radius: var(--r-lg);
      padding: var(--space-6); text-align: center; max-width: 320px; box-shadow: var(--shadow-lg);
    }
    .offline-icon { font-size: 44px; margin-bottom: var(--space-3); }
    .offline-card h3 { font-size: var(--fs-lg); margin-bottom: var(--space-2); color: var(--text); }
    .offline-card p { font-size: var(--fs-md); color: var(--text-muted); }
  `]
})
export class OfflineOverlayComponent {
  readonly net = inject(NetworkService);
}
