import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';

export type Theme = 'day' | 'night';
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(StorageService);
  private readonly document = inject(DOCUMENT);
  readonly theme = signal<Theme>(this.storage.read('theme') === 'night' ? 'night' : 'day');
  constructor() {
    effect(() => {
      const theme = this.theme();
      this.document.documentElement.dataset['theme'] = theme;
      this.document.documentElement.style.colorScheme = theme === 'night' ? 'dark' : 'light';
      this.document.documentElement.style.backgroundColor =
        theme === 'night' ? '#10172b' : '#f6f4ff';
      this.document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', theme === 'night' ? '#10172b' : '#f6f4ff');
    });
  }
  toggle(): void {
    this.theme.update((value) => (value === 'day' ? 'night' : 'day'));
    this.storage.write('theme', this.theme());
  }
}
