import { Injectable, signal, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { STORAGE_KEYS, SUPPORTED_LANGS, DEFAULT_LANG } from '../constants/app.constants';

/**
 * LanguageService — wraps ngx-translate and persists the choice to localStorage.
 * Call init() once at startup (done in AppComponent).
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  readonly current = signal<string>(DEFAULT_LANG);

  init(): void {
    this.translate.addLangs([...SUPPORTED_LANGS]);
    const saved = (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEYS.language)) || DEFAULT_LANG;
    const lang = (SUPPORTED_LANGS as readonly string[]).includes(saved) ? saved : DEFAULT_LANG;
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.use(lang);
  }

  use(lang: string): void {
    this.translate.use(lang);
    this.current.set(lang);
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEYS.language, lang);
  }

  toggle(): void {
    this.use(this.current() === 'en' ? 'ta' : 'en');
  }
}
