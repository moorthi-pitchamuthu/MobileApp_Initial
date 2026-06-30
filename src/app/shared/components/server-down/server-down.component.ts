import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/** Full-screen maintenance / server-down wall (shown by AppComponent). */
@Component({
  selector: 'app-server-down',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="wall">
      <div class="wall-inner">
        <div class="wall-icon">🛠️</div>
        <h1>{{ 'status.serverDown' | translate }}</h1>
        <p>{{ message || ('status.serverDownMsg' | translate) }}</p>
        <p class="eta" *ngIf="eta">{{ eta }}</p>
      </div>
    </div>
  `,
  styles: [`
    .wall {
      position: fixed; inset: 0; z-index: 9997;
      background: linear-gradient(160deg, var(--n-700), var(--n-900));
      display: flex; align-items: center; justify-content: center; padding: var(--space-6);
    }
    .wall-inner { text-align: center; color: #fff; max-width: 360px; }
    .wall-icon { font-size: 64px; margin-bottom: var(--space-4); }
    .wall-inner h1 { font-size: var(--fs-2xl); font-weight: var(--fw-bold); margin-bottom: var(--space-3); }
    .wall-inner p { font-size: var(--fs-md); opacity: .85; line-height: 1.6; }
    .eta { margin-top: var(--space-3); font-weight: var(--fw-semi); opacity: 1; }
  `]
})
export class ServerDownComponent {
  @Input() message = '';
  @Input() eta = '';
}
