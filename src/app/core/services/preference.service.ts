import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { VisualPreference } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PreferenceService {
  private readonly storage = inject(StorageService);
  private readonly media = window.matchMedia('(prefers-reduced-motion: reduce)');
  private readonly saved = this.storage.read('preferences');
  private readonly savedMotion =
    this.saved && typeof this.saved === 'object' && 'motion' in this.saved
      ? this.saved.motion
      : undefined;
  private wantedMotion = typeof this.savedMotion === 'boolean' ? this.savedMotion : true;
  readonly systemReduced = signal(this.media.matches);
  readonly motion = signal(this.wantedMotion && !this.media.matches);
  constructor() {
    const listener = (event: MediaQueryListEvent) => {
      this.systemReduced.set(event.matches);
      this.motion.set(this.wantedMotion && !event.matches);
    };
    this.media.addEventListener('change', listener);
    inject(DestroyRef).onDestroy(() => this.media.removeEventListener('change', listener));
  }
  toggleMotion(): void {
    this.wantedMotion = !this.motion();
    this.motion.set(this.wantedMotion && !this.systemReduced());
    const preference: VisualPreference = { motion: this.wantedMotion };
    this.storage.write('preferences', preference);
  }
}
