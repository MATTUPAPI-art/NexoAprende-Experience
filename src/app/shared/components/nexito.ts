import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { Stage } from '../../core/models/models';
import { VisibleAnimationDirective } from '../directives/visible-animation';
import { MEDIA } from '../../core/constants/media-manifest';

export type NexitoMood = 'greet' | 'think' | 'cheer' | 'calm';
@Component({
  selector: 'nx-nexito',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [VisibleAnimationDirective],
  host: {
    '[attr.data-mood]': 'effectiveMood()',
    '[attr.data-world]': 'stage() ?? profiles.stage()',
    '[class.is-waving]': 'waving()',
  },
  template: `
    <div class="nexito-character">
      @if (artSource() && effectiveMood() === 'cheer') {
        <span class="nexito-sparkles image-sparkles" aria-hidden="true">✦</span>
      }
      @if (artSource() && !artFailed()) {
        <img
          class="nexito-body nexito-image"
          [src]="artSource()"
          alt="Nexito, tu compañero de descubrimientos"
          width="480"
          height="438"
          loading="lazy"
          decoding="async"
          (error)="artFailed.set(true)"
        />
      } @else {
        <svg
          viewBox="0 0 320 330"
          fill="none"
          role="img"
          [attr.aria-label]="'Nexito, tu compañero de descubrimientos'"
        >
          <ellipse cx="160" cy="298" rx="82" ry="13" fill="#162c6120" />
          <g class="nexito-body">
            <g class="nexito-antenna">
              <path
                d="M162 78c-4-22 3-38 15-47"
                stroke="#5351a3"
                stroke-width="7"
                stroke-linecap="round"
              />
              <path
                d="m180 12 8 13 15 2-11 11 2 16-14-8-14 8 3-16-12-11 16-2Z"
                fill="#ffd55b"
                stroke="#f5af49"
                stroke-width="2"
              />
            </g>
            <path
              d="M114 95C85 63 73 66 65 73c-12 13 6 51 27 64m117-42c29-32 41-29 49-22 12 13-6 51-27 64"
              fill="var(--nexito-ear,#a2e7df)"
              stroke="var(--nexito-outline,#32898e)"
              stroke-width="3"
            />
            <path
              d="M100 228c-28 13-42 3-39-14 2-9 11-22 25-29"
              fill="var(--nexito-fill,#57c8c4)"
              stroke="var(--nexito-outline,#32898e)"
              stroke-width="3"
            />
            <g class="nexito-hand">
              <path
                d="M224 177c26 2 43-11 49-2 11 15-3 43-36 48"
                fill="var(--nexito-fill,#57c8c4)"
                stroke="var(--nexito-outline,#32898e)"
                stroke-width="3"
              />
              <path d="m267 182 6-2" stroke="#eefcf2" stroke-width="3" stroke-linecap="round" />
            </g>
            <path
              d="M109 259c-8 12-11 24-3 28 12 7 33-2 40-11m28 0c7 9 28 18 40 11 8-4 5-16-3-28"
              fill="#4c479d"
            />
            <path
              d="M160 69c-57 0-85 40-85 98 0 76 34 114 85 114s85-38 85-114c0-58-28-98-85-98Z"
              fill="var(--nexito-fill,#57c8c4)"
              stroke="var(--nexito-outline,#32898e)"
              stroke-width="3"
            />
            <path
              d="M103 104c12-18 28-24 46-25"
              stroke="#b5f1e6"
              stroke-width="7"
              stroke-linecap="round"
            />
            <path
              d="M160 111c-43 0-66 25-66 62 0 38 25 60 66 60s66-22 66-60c0-37-23-62-66-62Z"
              fill="#f0fff4"
            />
            <g class="nexito-eyes">
              <ellipse cx="133" cy="169" rx="9" ry="13" fill="#283758" />
              <ellipse cx="187" cy="169" rx="9" ry="13" fill="#283758" />
              <circle cx="136" cy="165" r="3" fill="#fff" />
              <circle cx="190" cy="165" r="3" fill="#fff" />
            </g>
            <ellipse cx="112" cy="190" rx="10" ry="6" fill="#f0ac99" />
            <ellipse cx="208" cy="190" rx="10" ry="6" fill="#f0ac99" />
            @if (effectiveMood() === 'cheer') {
              <path d="M145 190h30c0 24-30 24-30 0Z" fill="#364364" />
              <path d="M151 205c6-6 13-6 18 0" stroke="#f3b3ad" stroke-width="5" />
            } @else if (effectiveMood() === 'think') {
              <path d="M154 198h12" stroke="#364364" stroke-width="4" stroke-linecap="round" />
            } @else {
              <path
                d="M146 194q14 13 28 0"
                stroke="#364364"
                stroke-width="4"
                stroke-linecap="round"
              />
            }
            <path d="M104 234c25 10 80 10 112-1l-5 20c-31 10-74 11-105-1Z" fill="#7360c9" />
            <path d="m183 249 18 32 15-7-11-26" fill="#8b76dd" />
            <path d="m155 245 5 8 9-1-5 8 3 9-9-3-7 5v-10l-7-5 9-3Z" fill="#f8df7e" />
          </g>
          @if (effectiveMood() === 'cheer') {
            <g class="nexito-sparkles" stroke-linecap="round">
              <path
                d="m47 110 6 12m-17 6 12 2m222-25 7-11m0 23 13-1"
                stroke="#efbb4f"
                stroke-width="5"
              />
              <path d="m57 244 7 9m197 0 10-6" stroke="#9a7cdb" stroke-width="5" />
            </g>
          }
        </svg>
      }
    </div>
    @if (interactive()) {
      <button class="nexito-action" (click)="greet()" aria-label="Saludar a Nexito">
        <span>Saludar a Nexito</span><span aria-hidden="true">↗</span></button
      ><span class="sr-only" aria-live="polite">{{ announcement() }}</span>
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      width: 240px;
      max-width: 100%;
      --nexito-fill: #57c8c4;
      --nexito-ear: #a2e7df;
      --nexito-outline: #32898e;
    }
    :host([data-world='child']) {
      --nexito-fill: #62c8ac;
      --nexito-ear: #b4edd5;
      --nexito-outline: #3b947e;
    }
    :host([data-world='teen']) {
      --nexito-fill: #6db9e0;
      --nexito-ear: #b3dafa;
      --nexito-outline: #4678a6;
    }
    .nexito-character {
      width: 100%;
      transform-origin: center bottom;
    }
    .nexito-image {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
      transform-origin: center bottom;
    }
    .image-sparkles {
      position: absolute;
      right: 4%;
      top: 10%;
      color: #e0a829;
      font-size: 30px;
      pointer-events: none;
    }
    :host(.is-waving) .nexito-image {
      animation: nexito-shine 0.65s ease-out 2;
    }
    .nexito-character svg {
      width: 100%;
      height: auto;
      display: block;
      overflow: visible;
    }
    .nexito-body {
      transform-origin: 160px 290px;
      animation: nexito-float 6s ease-in-out infinite;
    }
    .nexito-eyes {
      transform-origin: 160px 170px;
      animation: nexito-blink 9s infinite;
    }
    .nexito-hand {
      transform-origin: 232px 198px;
    }
    :host(.is-waving) .nexito-hand,
    :host([data-mood='cheer']) .nexito-hand {
      animation: nexito-wave 0.65s ease-in-out 3;
    }
    .nexito-sparkles {
      animation: nexito-shine 1.1s ease-out 2;
    }
    :host([data-mood='calm']) .nexito-body {
      animation-duration: 9s;
    }
    :host([data-mood='think']) .nexito-character {
      rotate: -5deg;
    }
    :host(.out-of-view) * {
      animation-play-state: paused !important;
    }
    .nexito-action {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      border: 1px solid #c1d9e3;
      background: #ffffffec;
      color: #28546b;
      min-height: 44px;
      padding: 9px 16px;
      border-radius: 24px;
      margin: -11px auto 0;
      position: relative;
      font-size: 11px;
      font-weight: 850;
      box-shadow: 0 3px 0 #284d6414;
    }
    .nexito-action:hover {
      background: #e8fbff;
    }
    .nexito-action:active {
      transform: scale(0.97);
    }
    @keyframes nexito-float {
      0%,
      100% {
        translate: 0 0;
      }
      50% {
        translate: 0 -7px;
      }
    }
    @keyframes nexito-blink {
      0%,
      42%,
      46%,
      100% {
        scale: 1 1;
      }
      44% {
        scale: 1 0.12;
      }
    }
    @keyframes nexito-wave {
      0%,
      100% {
        rotate: 0deg;
      }
      45% {
        rotate: -32deg;
      }
    }
    @keyframes nexito-shine {
      0% {
        opacity: 0.4;
        scale: 0.9;
      }
      60%,
      100% {
        opacity: 1;
        scale: 1;
      }
    }
    :host-context(.motion-off) * {
      animation: none !important;
      transition: none !important;
    }
    :host-context(.motion-off) .nexito-character {
      rotate: 0deg;
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
      }
      .nexito-character {
        rotate: 0deg;
      }
    }
  `,
})
export class NexitoComponent {
  readonly artFailed = signal(false);
  readonly artSource = computed(() =>
    this.effectiveMood() === 'cheer' ? (MEDIA.art.victory ?? MEDIA.art.nexito) : MEDIA.art.nexito,
  );
  readonly profiles = inject(ProfileService);
  readonly mood = input<NexitoMood>('greet');
  readonly stage = input<Stage>();
  readonly interactive = input(false);
  readonly waving = signal(false);
  readonly announcement = signal('');
  readonly effectiveMood = computed(() => (this.waving() ? 'cheer' : this.mood()));
  private timer?: ReturnType<typeof setTimeout>;
  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }
  greet(): void {
    clearTimeout(this.timer);
    this.waving.set(true);
    this.announcement.set(
      `¡Hola, ${this.profiles.profile().name}! Soy Nexito. ¿Qué descubrimos hoy?`,
    );
    this.timer = setTimeout(() => this.waving.set(false), 2000);
  }
}
