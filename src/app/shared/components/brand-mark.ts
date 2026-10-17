import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MEDIA } from '../../core/constants/media-manifest';
@Component({
  selector: 'nx-brand-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `@if (media.art.favicon && !failed()) {
      <img [src]="media.art.favicon" width="44" height="44" alt="" (error)="failed.set(true)" />
    } @else {
      <svg viewBox="0 0 64 64" fill="none">
        <path
          d="M6 40c0-14 6-25 17-25 12 0 18 22 28 22 5 0 8-5 7-12"
          stroke="#37aeb5"
          stroke-width="10"
          stroke-linecap="round"
        />
        <path
          d="M58 24c0 14-6 25-17 25-12 0-18-22-28-22-5 0-8 5-7 12"
          stroke="#7160c7"
          stroke-width="10"
          stroke-linecap="round"
        />
        <path d="m48 7 3 5 6 1-4 4 1 6-6-3-5 3 1-6-4-4 6-1Z" fill="#f5c44e" />
      </svg>
    }`,
  styles: `
    :host {
      display: block;
      width: 44px;
      height: 44px;
      flex: none;
    }
    svg,
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class BrandMarkComponent {
  readonly media = MEDIA;
  readonly failed = signal(false);
}
