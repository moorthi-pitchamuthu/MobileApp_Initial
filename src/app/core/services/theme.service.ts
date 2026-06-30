import { Injectable } from '@angular/core';

/**
 * ThemeService — optional runtime theming.
 *
 * Static theming lives in src/theme/_tokens.scss (the source of truth).
 * This service lets you OVERRIDE any token at runtime — e.g. apply a brand
 * color fetched from the backend, or a user-selected accent — by setting the
 * matching CSS custom property on the document root.
 *
 * Example:  theme.setToken('--primary', '#e11d48');
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** Override a single design token at runtime. */
  setToken(name: string, value: string): void {
    document.documentElement.style.setProperty(name, value);
  }

  /** Override many tokens at once. */
  setTokens(tokens: Record<string, string>): void {
    Object.entries(tokens).forEach(([k, v]) => this.setToken(k, v));
  }

  /** Convenience: set the primary brand color (and a darker active shade). */
  setPrimary(color: string, dark?: string): void {
    this.setToken('--primary', color);
    if (dark) this.setToken('--primary-dark', dark);
  }

  /** Remove a runtime override and fall back to the _tokens.scss value. */
  reset(name: string): void {
    document.documentElement.style.removeProperty(name);
  }
}
