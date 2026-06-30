import { Component, Input, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

/**
 * Top app bar. Fixed to the top of the mobile shell.
 *   <app-header title="Dashboard" [showBack]="true"></app-header>
 * Pair it with a <div class="hdr-spacer"></div> so content isn't hidden behind it.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="hdr">
      <button class="hdr-btn" *ngIf="showBack" (click)="back()" aria-label="Back">‹</button>
      <h1 class="hdr-title">{{ title }}</h1>
      <button class="hdr-btn lang" (click)="lang.toggle()" [attr.aria-label]="'Language'">
        {{ lang.current() === 'en' ? 'த' : 'EN' }}
      </button>
    </header>
  `,
  styles: [`
    .hdr {
      position: fixed; top: 0; left: 50%; transform: translateX(-50%);
      width: 100%; max-width: var(--max-w); height: var(--header-h);
      padding-top: var(--sat);
      display: flex; align-items: center; gap: var(--space-2);
      padding-left: var(--space-3); padding-right: var(--space-3);
      background: var(--surface); border-bottom: 1px solid var(--border);
      z-index: 80;
    }
    .hdr-title { flex: 1; font-size: var(--fs-lg); font-weight: var(--fw-bold); color: var(--text); }
    .hdr-btn {
      min-width: 36px; height: 36px; border-radius: var(--r-sm);
      display: flex; align-items: center; justify-content: center;
      font-size: var(--fs-lg); color: var(--text); background: var(--n-100);
    }
    .hdr-btn.lang { font-weight: var(--fw-bold); font-size: var(--fs-sm); color: var(--primary); }
  `]
})
export class HeaderComponent {
  @Input() title = '';
  @Input() showBack = false;

  readonly lang = inject(LanguageService);
  private location = inject(Location);

  back(): void { this.location.back(); }
}
