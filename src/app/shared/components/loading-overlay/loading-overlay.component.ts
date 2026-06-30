import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading.service';

/** Full-screen spinner shown while LoadingService.isLoading() is true. */
@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" *ngIf="loading.isLoading()">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed; inset: 0; z-index: 9990;
      background: rgba(255,255,255,.6); backdrop-filter: blur(2px);
      display: flex; align-items: center; justify-content: center;
    }
    .spinner {
      width: 42px; height: 42px; border-radius: 50%;
      border: 4px solid var(--n-200); border-top-color: var(--primary);
      animation: spin .8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoadingOverlayComponent {
  readonly loading = inject(LoadingService);
}
