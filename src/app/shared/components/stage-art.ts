import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { Stage } from '../../core/models/models';
import { MEDIA } from '../../core/constants/media-manifest';

@Component({
  selector: 'nx-stage-art',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-world]': 'stage()' },
  template: ` @if (kind() === 'photo' && image() && !failed()) {
      <img
        [src]="image()"
        [alt]="description()"
        [loading]="eager() ? 'eager' : 'lazy'"
        decoding="async"
        (error)="failed.set(true)"
      />
    } @else {
      <svg
        viewBox="0 0 600 460"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        @switch (stage()) {
          @case ('child') {
            <path d="M0 0h600v460H0z" fill="#f5c44d" />
            <path d="M0 350Q160 250 325 350T600 300v160H0Z" fill="#e7794c" />
            <path d="M65 0v140a100 100 0 0 0 200 0V0" stroke="#fff0ba" stroke-width="44" />
            <path d="M65 0v140a100 100 0 0 0 200 0V0" stroke="#e590b3" stroke-width="16" />
            <g transform="rotate(-10 325 260)">
              <rect x="218" y="158" width="207" height="229" rx="13" fill="#fbf4df" />
              <rect x="240" y="181" width="160" height="155" fill="#b9d1ad" />
              <path d="m252 316 45-89 30 49 26-25 38 65Z" fill="#43856d" />
              <circle cx="368" cy="207" r="16" fill="#f3c34e" />
              <path d="M260 361h117" stroke="#aa9780" stroke-width="5" stroke-linecap="round" />
            </g>
            <g transform="rotate(19 470 156)">
              <path d="M445 242V79l25-37 25 37v163Z" fill="#7654aa" />
              <path d="m445 79 25-37 25 37" fill="#f4dfbc" />
              <path d="m461 55 9-13 9 13" fill="#3a3048" />
              <path d="M460 84v147" stroke="#a18ac6" stroke-width="9" />
            </g>
            <circle cx="110" cy="310" r="36" fill="#fff1c4" />
            <path
              d="m93 309 12 13 24-27"
              stroke="#588269"
              stroke-width="7"
              stroke-linecap="round"
            />
            <path d="m490 335 12 27 29 3-22 20 6 29-25-14-26 14 6-29-22-20 30-3Z" fill="#fff0b8" />
            <path
              d="m355 70 8 16m-30-4-15 10m66 4 17 4"
              stroke="#694893"
              stroke-width="5"
              stroke-linecap="round"
            />
          }
          @case ('junior') {
            <path d="M0 0h600v460H0z" fill="#6650c6" />
            <path
              d="M0 80h600M0 160h600M0 240h600M0 320h600M0 400h600M100 0v460M200 0v460M300 0v460M400 0v460M500 0v460"
              stroke="#ffffff13"
            />
            <ellipse
              cx="300"
              cy="240"
              rx="243"
              ry="101"
              transform="rotate(-25 300 240)"
              stroke="#b7df73"
              stroke-width="4"
            />
            <circle cx="300" cy="228" r="108" fill="#ac9ae6" />
            <path
              d="M211 167c54 3 34 42 67 43s18 35 59 43 29 35 26 68M264 126c-9 29 23 31 45 32s33 20 82 20"
              stroke="#8570c8"
              stroke-width="23"
              stroke-linecap="round"
            />
            <path
              d="M128 340c72 13 183-4 290-77"
              stroke="#b7df73"
              stroke-width="8"
              stroke-linecap="round"
            />
            <g transform="rotate(12 455 114)">
              <rect x="406" y="68" width="100" height="92" rx="15" fill="#f7edcf" />
              <path
                d="m427 112 15 16 35-37"
                stroke="#6852ba"
                stroke-width="8"
                stroke-linecap="round"
              />
            </g>
            <circle cx="135" cy="138" r="23" fill="#f39c77" />
            <circle cx="461" cy="319" r="13" fill="#b7df73" />
            <path
              d="m104 251 15 15-15 15m398-70 12 12-12 12M293 50v24m-12-12h24"
              stroke="#e5dbfc"
              stroke-width="4"
              stroke-linecap="round"
            />
            <path
              d="M78 402h135m212-348h100"
              stroke="#c5b6f0"
              stroke-width="2"
              stroke-dasharray="5 7"
            />
          }
          @case ('teen') {
            <path d="M0 0h600v460H0z" fill="#183d48" />
            <circle cx="480" cy="60" r="155" fill="#24535c" />
            <path d="M0 345h600v115H0Z" fill="#bdc5a7" />
            <path d="M37 345h520" stroke="#e4e7d9" stroke-width="2" />
            <g transform="rotate(-9 255 260)">
              <path
                d="M125 191h160c39-28 78-35 160-10v152c-60-19-112-12-160 12-48-24-100-31-160-12Z"
                fill="#71968b"
              />
              <path
                d="M133 182c65-14 108-4 152 19 44-23 87-33 152-19v142c-61-14-108-5-152 17-44-22-91-31-152-17Z"
                fill="#f2efdf"
              />
              <path
                d="M285 201v139m-127-123 93 13m-93 10 93 13m-93 11 93 13m-93 10 57 7m104-64 92-13m-92 36 92-13m-92 37 92-13"
                stroke="#c1c3b2"
                stroke-width="4"
                stroke-linecap="round"
              />
            </g>
            <path
              d="M458 341V195m0 99c-64-1-68-68-68-68 58-2 69 40 68 68Zm0-43c58-6 67-71 67-71-55 1-66 45-67 71Z"
              fill="#8da37c"
              stroke="#8da37c"
              stroke-width="3"
            />
            <path d="M426 324h64l-10 57h-44Z" fill="#d29371" />
            <path d="M105 118h136m-136 11h87" stroke="#7ba497" stroke-width="2" />
            <circle cx="115" cy="80" r="5" fill="#d7cd91" />
            <path d="m350 95 9 9-9 9" stroke="#e5dfc6" stroke-width="2" />
          }
        }
      </svg>
    }`,
  styles: `
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      isolation: isolate;
      background: #e9e0cd;
    }
    img,
    svg {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
    img {
      transition: transform 0.8s ease;
    }
    :host-context(.world-card:hover) img {
      transform: scale(1.045);
    }
    :host-context(.motion-off) img {
      transition: none;
    }
    @media (prefers-reduced-motion: reduce) {
      img {
        transition: none;
      }
    }
  `,
})
export class StageArtComponent {
  readonly stage = input<Stage>('junior');
  readonly eager = input(false);
  readonly kind = input<'illustration' | 'photo'>('illustration');
  readonly failed = signal(false);
  constructor() {
    effect(() => {
      this.stage();
      this.failed.set(false);
    });
  }
  image() {
    return MEDIA.stages[this.stage()];
  }
  description() {
    return {
      child: 'Niños en un aula decorada con globos de colores',
      junior: 'Niños jugando al aire libre en un bosque',
      teen: 'Panel de actividades y materiales educativos en un aula',
    }[this.stage()];
  }
}
