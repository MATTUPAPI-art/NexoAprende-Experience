import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { ProfileService } from './core/services/profile.service';
import { PreferenceService } from './core/services/preference.service';
import { StorageService } from './core/services/storage.service';
import { IconComponent } from './shared/components/icon';
import { BrandMarkComponent } from './shared/components/brand-mark';
import { ThemeService } from './core/services/theme.service';
import { ThemeToggleComponent } from './shared/components/theme-toggle';
import { MEDIA } from './core/constants/media-manifest';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    IconComponent,
    BrandMarkComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { '(window:keydown)': 'handleKey($event)' },
})
export class App {
  readonly themes = inject(ThemeService);
  readonly media = MEDIA;
  readonly profiles = inject(ProfileService);
  readonly preferences = inject(PreferenceService);
  readonly storage = inject(StorageService);
  readonly menuOpen = signal(false);
  readonly pageTitle = signal('Inicio');
  readonly year = 2026;
  readonly mobile = signal(window.matchMedia('(max-width: 960px)').matches);
  readonly mainNav = [
    { path: '/', label: 'Inicio', icon: 'home' },
    { path: '/panel', label: 'Mi espacio', icon: 'sparkles' },
    { path: '/actividades', label: 'Actividades', icon: 'grid' },
    { path: '/progreso', label: 'Mi progreso', icon: 'chart' },
  ];
  constructor() {
    const router = inject(Router);
    const destroy = inject(DestroyRef);
    const viewport = window.matchMedia('(max-width: 960px)');
    const onViewport = (event: MediaQueryListEvent) => {
      this.mobile.set(event.matches);
      this.menuOpen.set(false);
    };
    viewport.addEventListener('change', onViewport);
    destroy.onDestroy(() => viewport.removeEventListener('change', onViewport));
    router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(destroy),
      )
      .subscribe(() => {
        let route = router.routerState.snapshot.root;
        while (route.firstChild) route = route.firstChild;
        this.pageTitle.set(String(route.data['label'] ?? 'Inicio'));
        this.menuOpen.set(false);
        requestAnimationFrame(() =>
          document.getElementById('main-content')?.focus({ preventScroll: true }),
        );
      });
  }
  closeMenu(): void {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
      requestAnimationFrame(() =>
        document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus(),
      );
    }
  }
  toggleMenu(): void {
    if (this.menuOpen()) this.closeMenu();
    else {
      this.menuOpen.set(true);
      requestAnimationFrame(() =>
        document.querySelector<HTMLAnchorElement>('.sidebar .brand')?.focus(),
      );
    }
  }
  handleKey(event: KeyboardEvent): void {
    if (!this.mobile() || !this.menuOpen()) return;
    if (event.key === 'Escape') {
      this.closeMenu();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...document.querySelectorAll<HTMLElement>('.sidebar-scrim, .sidebar a')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
}
