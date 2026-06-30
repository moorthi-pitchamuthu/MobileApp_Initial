import { Injectable, signal } from '@angular/core';

/**
 * NetworkService — online/offline detection.
 * Starts with navigator.onLine and listens for browser online/offline events.
 * The <app-offline-overlay> component blocks the UI when isOnline() is false.
 *
 * TODO (optional): for Android WebView reliability, replace the event listeners
 * with an active reachability ping (navigator.onLine is unreliable there).
 */
@Injectable({ providedIn: 'root' })
export class NetworkService {
  readonly isOnline = signal(typeof navigator !== 'undefined' ? navigator.onLine : true);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.isOnline.set(true));
      window.addEventListener('offline', () => this.isOnline.set(false));
    }
  }
}
