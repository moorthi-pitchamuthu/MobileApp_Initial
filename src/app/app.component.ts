import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { AppConfigService } from './core/services/app-config.service';
import { LanguageService } from './core/services/language.service';
import { APP_NAME } from './core/constants/app.constants';

import { AlertToastComponent } from './shared/components/alert-toast/alert-toast.component';
import { LoadingOverlayComponent } from './shared/components/loading-overlay/loading-overlay.component';
import { OfflineOverlayComponent } from './shared/components/offline-overlay/offline-overlay.component';
import { ServerDownComponent } from './shared/components/server-down/server-down.component';
import { UpdateWallComponent } from './shared/components/update-wall/update-wall.component';

/**
 * Root component — owns the global shell:
 *   • startup splash (until app config is checked)
 *   • server-down (maintenance) wall
 *   • force-update wall
 *   • offline overlay, global toast, global loader
 *   • <router-outlet> for everything else
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet,
    AlertToastComponent, LoadingOverlayComponent, OfflineOverlayComponent,
    ServerDownComponent, UpdateWallComponent,
  ],
  template: `
    <!-- Global toast + loader + offline overlay (always mounted) -->
    <app-alert-toast></app-alert-toast>
    <app-loading-overlay></app-loading-overlay>
    <app-offline-overlay></app-offline-overlay>

    <!-- Startup splash while we check maintenance/update status -->
    <div class="startup-splash" *ngIf="!cfg.checked()">
      <div class="splash-inner">
        <div class="splash-logo">📱</div>
        <div class="splash-name">{{ appName }}</div>
        <div class="splash-dots"><span></span><span></span><span></span></div>
      </div>
    </div>

    <!-- Server-down / maintenance wall -->
    <app-server-down
      *ngIf="cfg.checked() && cfg.isMaintenance()"
      [message]="cfg.maintenanceMsg()" [eta]="cfg.maintenanceEta()">
    </app-server-down>

    <!-- Force-update wall -->
    <app-update-wall
      *ngIf="cfg.checked() && !cfg.isMaintenance() && cfg.needsUpdate()"
      [message]="cfg.updateMsg()" [updateUrl]="cfg.updateUrl()">
    </app-update-wall>

    <!-- Normal app -->
    <router-outlet
      *ngIf="cfg.checked() && !cfg.isMaintenance() && !cfg.needsUpdate()">
    </router-outlet>
  `,
  styles: [`
    .startup-splash {
      position: fixed; inset: 0; z-index: 9998;
      background: linear-gradient(160deg, var(--primary-dark), var(--primary));
      display: flex; align-items: center; justify-content: center;
    }
    .splash-inner { text-align: center; color: #fff; }
    .splash-logo { font-size: 64px; margin-bottom: 12px; animation: bounce .8s ease infinite alternate; }
    @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-10px); } }
    .splash-name { font-size: 20px; font-weight: 700; margin-bottom: 24px; opacity: .95; }
    .splash-dots { display: flex; justify-content: center; gap: 8px; }
    .splash-dots span {
      width: 10px; height: 10px; background: rgba(255,255,255,.7);
      border-radius: 50%; animation: dot 1.4s ease-in-out infinite;
    }
    .splash-dots span:nth-child(2) { animation-delay: .2s; }
    .splash-dots span:nth-child(3) { animation-delay: .4s; }
    @keyframes dot { 0%,80%,100% { transform: scale(.6); opacity: .4; } 40% { transform: scale(1); opacity: 1; } }
  `]
})
export class AppComponent implements OnInit {
  readonly cfg = inject(AppConfigService);
  private lang = inject(LanguageService);
  readonly appName = APP_NAME;

  constructor() {
    // Apply saved language before the first view renders.
    this.lang.init();
  }

  ngOnInit(): void {
    // Check maintenance / force-update status (tolerant of no backend).
    this.cfg.checkStatus();
  }
}
