import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable empty-state placeholder. Drop into any screen that has no data yet:
 *   <app-empty-state icon="📭" text="Nothing here yet"></app-empty-state>
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <span class="es-icon">{{ icon }}</span>
      <p>{{ text }}</p>
      <p class="text-sm text-faint" *ngIf="hint">{{ hint }}</p>
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() icon = '📭';
  @Input() text = 'Nothing here yet';
  @Input() hint = '';
}
