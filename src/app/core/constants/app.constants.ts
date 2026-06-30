/**
 * App-wide constants. Keep magic strings/numbers here, not scattered in code.
 */

/** Current app version — compared against minRequiredVersion for force-update. */
export const APP_VERSION = '1.0.0';

/** Display name (also see i18n key app.name). */
export const APP_NAME = 'MobileApp';

/** localStorage keys. */
export const STORAGE_KEYS = {
  language: 'app_language',
  theme: 'app_theme',
} as const;

/** Supported language codes. */
export const SUPPORTED_LANGS = ['en', 'ta'] as const;
export const DEFAULT_LANG = 'en';

/** User roles. */
export type UserRole = 'admin' | 'customer' | 'employee';

/** Default store/play URL used by the force-update wall. */
export const DEFAULT_UPDATE_URL = 'https://play.google.com/store/apps/details?id=com.example.mobileapp';
