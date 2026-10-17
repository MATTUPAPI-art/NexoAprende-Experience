import { ChangeDetectionStrategy, Component, input } from '@angular/core';

const PATHS: Record<string, string> = {
  home: 'm3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  chart: 'M4 3v17h17M8 15v-4M13 15V6M18 15V9',
  users:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M17 4a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87',
  briefcase: 'M9 7V4h6v3M3 7h18v14H3zM3 12l9 4 9-4M12 13v4',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  chevron: 'm9 5 7 7-7 7',
  back: 'M20 12H4m6-6-6 6 6 6',
  sparkles: 'm12 3 2.8 6.2L21 12l-6.2 2.8L12 21l-2.8-6.2L3 12l6.2-2.8Z',
  book: 'M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-4-2-7-1-10 1Zm0 0v15',
  cards: 'm8 3 13 3-3 14-13-3ZM3 7 1 19l12 3M11 9h5m-6 4h5',
  scan: 'M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5M7 12s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4ZM12 11v2',
  clock: 'M12 8v5l3 2M22 12A10 10 0 1 1 2 12a10 10 0 0 1 20 0',
  check: 'm5 12 4 4L19 6',
  leaf: 'M20 3C7 2 2 7 4 15c6 6 17 0 16-12ZM4 21 16 9',
  pause: 'M8 4v16M16 4v16',
  play: 'm8 4 12 8-12 8Z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  help: 'M9 8a3 3 0 0 1 6 0c0 2-3 2-3 5m0 3v1M22 12A10 10 0 1 1 2 12a10 10 0 0 1 20 0',
  shield: 'm12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Zm-4 10 3 3 5-6',
  star: 'm12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z',
  trophy: 'M8 3h8v8a4 4 0 0 1-8 0ZM8 5H3v3c0 4 5 4 5 4m8-7h5v3c0 4-5 4-5 4M12 15v6m-5 0h10',
  reset: 'M3 11a9 9 0 1 1 2 7M3 4v7h7',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
  heart:
    'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  settings: 'M4 7h16M4 17h16M8 4v6m8 4v6',
};
@Component({
  selector: 'nx-icon',
  template: `<svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path [attr.d]="path()" />
  </svg>`,
  styles: `
    :host {
      display: inline-flex;
      width: 1.25rem;
      height: 1.25rem;
      flex: none;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input('sparkles');
  path() {
    return PATHS[this.name()] ?? PATHS['sparkles'];
  }
}
