import { Injectable, signal, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { APP_VERSION, DEFAULT_UPDATE_URL } from '../constants/app.constants';
import { COLLECTIONS, DOCS } from '../constants/firestore-collections';
import { AppConfigSettings } from '../models/app-config.model';
import { environment } from '../../../environments/environment';

/**
 * AppConfigService — drives the server-down (maintenance) and force-update walls.
 *
 * This IS infrastructure (not business logic), so it keeps a real Firestore read.
 * It tolerates a missing/unreachable config doc, so the dummy app boots fine with
 * no backend: if the read fails, the app simply proceeds normally.
 *
 * Backend contract — document `app_config/settings`:
 *   maintenanceMode: boolean
 *   maintenanceMessage / maintenanceEta: string
 *   minRequiredVersion: "1.2.0"  (force update if APP_VERSION < this)
 *   updateMessage / updateUrl: string
 */
@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private fs = inject(Firestore);

  readonly isMaintenance = signal(false);
  readonly needsUpdate = signal(false);
  readonly maintenanceMsg = signal('We are performing scheduled maintenance. Please check back shortly.');
  readonly maintenanceEta = signal('');
  readonly updateMsg = signal('A new version of the app is available. Please update to continue.');
  readonly updateUrl = signal(DEFAULT_UPDATE_URL);
  readonly checked = signal(false);

  async checkStatus(): Promise<void> {
    try {
      const snap = await getDoc(doc(this.fs, COLLECTIONS.appConfig, DOCS.appSettings));
      if (snap.exists()) {
        const data = snap.data() as AppConfigSettings;

        if (environment.features.enableMaintenanceMode && data.maintenanceMode === true) {
          this.isMaintenance.set(true);
          if (data.maintenanceMessage) this.maintenanceMsg.set(data.maintenanceMessage);
          if (data.maintenanceEta) this.maintenanceEta.set(data.maintenanceEta);
        }

        if (environment.features.enableForceUpdate &&
            data.minRequiredVersion &&
            this.isVersionLower(APP_VERSION, data.minRequiredVersion)) {
          this.needsUpdate.set(true);
          if (data.updateMessage) this.updateMsg.set(data.updateMessage);
          if (data.updateUrl) this.updateUrl.set(data.updateUrl);
        }
      }
    } catch (e) {
      // No backend / offline / placeholder config — proceed normally.
      console.warn('[AppConfig] Could not fetch config (running without backend):', e);
    } finally {
      this.checked.set(true);
    }
  }

  /** Returns true when `current` semver < `required`. */
  isVersionLower(current: string, required: string): boolean {
    const a = current.split('.').map(Number);
    const b = required.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
      if ((a[i] || 0) < (b[i] || 0)) return true;
      if ((a[i] || 0) > (b[i] || 0)) return false;
    }
    return false;
  }
}
