import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: number;
  type: AlertType;
  text: string;
}

/**
 * AlertService — signal-based toast/alert queue.
 * The <app-alert-toast> component renders whatever is in `toasts()`.
 */
@Injectable({ providedIn: 'root' })
export class AlertService {
  private _toasts = signal<ToastMessage[]>([]);
  readonly toasts = this._toasts.asReadonly();
  private seq = 0;

  show(text: string, type: AlertType = 'info', duration = 3000): void {
    const id = ++this.seq;
    this._toasts.update(list => [...list, { id, type, text }]);
    if (duration > 0) setTimeout(() => this.dismiss(id), duration);
  }

  success(text: string, duration = 3000) { this.show(text, 'success', duration); }
  error(text: string, duration = 4000) { this.show(text, 'error', duration); }
  warning(text: string, duration = 3500) { this.show(text, 'warning', duration); }
  info(text: string, duration = 3000) { this.show(text, 'info', duration); }

  dismiss(id: number): void {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }
}
