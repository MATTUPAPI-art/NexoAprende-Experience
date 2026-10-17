import { Injectable, signal } from '@angular/core';

/** Single boundary for browser persistence; unavailable storage falls back to this session. */
@Injectable({ providedIn: 'root' })
export class StorageService {
  readonly available = signal(true);
  read(key: string): unknown {
    let value: string | null;
    try {
      value = localStorage.getItem(`nexo.${key}`);
    } catch {
      this.available.set(false);
      return null;
    }
    try {
      return value ? (JSON.parse(value) as unknown) : null;
    } catch {
      return null;
    }
  }
  write(key: string, value: unknown): void {
    try {
      localStorage.setItem(`nexo.${key}`, JSON.stringify(value));
      this.available.set(true);
    } catch {
      this.available.set(false);
    }
  }
}
