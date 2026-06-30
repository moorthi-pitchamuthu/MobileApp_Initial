/**
 * Firestore collection / document names in one place.
 * See docs/DATABASE_SCHEMA.md for the field-level mock schema.
 */
export const COLLECTIONS = {
  users: 'users',
  appConfig: 'app_config',
  buildManagement: 'build_management',
  forceUpdate: 'force_update',
  serverStatus: 'server_status',
  menuItems: 'menu_items',
  roles: 'roles',
  notifications: 'notifications',
} as const;

/** Well-known document ids. */
export const DOCS = {
  /** app_config/settings holds maintenance + force-update fields. */
  appSettings: 'settings',
} as const;
