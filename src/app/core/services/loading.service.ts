import { Injectable, signal, computed } from '@angular/core';

/**
 * LoadingService — ref-counted global loading spinner.
 * Call show()/hide() in pairs, or wrap() a promise.
 * The <app-loading-overlay> component shows while isLoading() is true.
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private count = signal(0);
  readonly isLoading = computed(() => this.count() > 0);

  show(): void { this.count.update(c => c + 1); }
  hide(): void { this.count.update(c => Math.max(0, c - 1)); }

  /** Show the loader while a promise runs, then hide it. */
  async wrap<T>(work: Promise<T>): Promise<T> {
    this.show();
    try { return await work; }
    finally { this.hide(); }
  }
}
