import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly storageKey = 'soundwave.theme';

  private readonly themeState = signal<Theme>(this.restore());

  readonly theme = this.themeState.asReadonly();

  readonly isDark = computed(() => this.themeState() === 'dark');

  constructor() {
    effect(() => {
      const theme = this.themeState();

      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      document.documentElement.dataset['theme'] = theme;

      try {
        localStorage.setItem(this.storageKey, theme);
      } catch (error) {
        console.error('Errore durante il salvataggio del tema:', error);
      }
    });
  }

  toggle(): void {
    this.themeState.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  set(theme: Theme): void {
    this.themeState.set(theme);
  }

  private restore(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light';
    }

    try {
      const saved = localStorage.getItem(this.storageKey);

      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch {
      // storage non disponibile: si prosegue con il tema chiaro
    }

    return 'light';
  }
}
