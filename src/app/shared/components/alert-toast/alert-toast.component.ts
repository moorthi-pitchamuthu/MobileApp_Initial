import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../core/services/alert.service';

/** Global toast stack. Driven entirely by AlertService.toasts(). */
@Component({
  selector: 'app-alert-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-wrap">
      <div *ngFor="let t of alerts.toasts()" class="toast" [class]="'toast-' + t.type"
           (click)="alerts.dismiss(t.id)">
        {{ t.text }}
      </div>
    </div>
  `,
  styles: [`
    .toast-wrap {
      position: fixed; top: calc(var(--sat) + 12px); left: 0; right: 0;
      z-index: 9999; display: flex; flex-direction: column; align-items: center;
      gap: var(--space-2); pointer-events: none; padding: 0 var(--space-4);
    }
    .toast {
      pointer-events: auto; max-width: var(--max-w); width: 100%;
      padding: var(--space-3) var(--space-4); border-radius: var(--r-md);
      color: #fff; font-size: var(--fs-md); font-weight: var(--fw-medium);
      box-shadow: var(--shadow-md); cursor: pointer;
    }
    .toast-success { background: var(--success); }
    .toast-error   { background: var(--danger); }
    .toast-warning { background: var(--warning); }
    .toast-info    { background: var(--info); }
  `]
})
export class AlertToastComponent {
  readonly alerts = inject(AlertService);
}
