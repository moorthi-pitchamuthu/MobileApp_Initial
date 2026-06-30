import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/** Full-screen force-update wall (shown by AppComponent). */
@Component({
  selector: 'app-update-wall',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="wall">
      <div class="wall-inner">
        <div class="wall-icon">⬆️</div>
        <h1>{{ 'status.updateTitle' | translate }}</h1>
        <p>{{ message || ('status.updateMsg' | translate) }}</p>
        <a class="btn btn-primary btn-full mt-4" [href]="updateUrl" target="_blank" rel="noopener">
          {{ 'status.updateNow' | translate }}
        </a>
      </div>
    </div>
  `,
  styles: [`
    .wall {
      position: fixed; inset: 0; z-index: 9997;
      background: linear-gradient(160deg, var(--primary-dark), var(--primary));
      display: flex; align-items: center; justify-content: center; padding: var(--space-6);
    }
    .wall-inner { text-align: center; color: #fff; max-width: 360px; }
    .wall-icon { font-size: 64px; margin-bottom: var(--space-4); }
    .wall-inner h1 { font-size: var(--fs-2xl); font-weight: var(--fw-bold); margin-bottom: var(--space-3); }
    .wall-inner p { font-size: var(--fs-md); opacity: .9; line-height: 1.6; }
    .wall-inner .btn { background: #fff; color: var(--primary-dark); }
  `]
})
export class UpdateWallComponent {
  @Input() message = '';
  @Input() updateUrl = '';
}
