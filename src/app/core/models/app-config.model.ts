/**
 * Shape of the `app_config/settings` document that drives the
 * maintenance (server-down) and force-update walls.
 */
export interface AppConfigSettings {
  maintenanceMode?: boolean;
  maintenanceMessage?: string;
  maintenanceEta?: string;
  minRequiredVersion?: string;  // e.g. "1.2.0" — force update if APP_VERSION < this
  updateMessage?: string;
  updateUrl?: string;
}
