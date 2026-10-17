import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { PreferenceService } from '../../core/services/preference.service';
import { VisibleAnimationDirective } from '../directives/visible-animation';
import { IconComponent } from './icon';

@Component({
  selector: 'nx-multimedia-background',
  imports: [IconComponent],
  hostDirectives: [VisibleAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.has-video]': '!!videoSrc()',
    '[class.is-playing]': 'playing()',
    '[class.media-ready]': 'ready()',
  },
  template: `
    @if (poster()) {
      <img
        class="media-poster"
        [src]="poster()"
        alt=""
        decoding="async"
        [loading]="priority() ? 'eager' : 'lazy'"
        (error)="posterFailed.set(true)"
        [hidden]="posterFailed()"
      />
    }
    @if (source()) {
      <video
        #video
        [muted]="true"
        loop
        playsinline
        preload="none"
        [attr.poster]="poster()"
        aria-hidden="true"
        tabindex="-1"
        (playing)="playing.set(true)"
        (loadeddata)="ready.set(true)"
        (pause)="playing.set(false)"
        (error)="failed.set(true)"
      >
        <source
          [src]="source()"
          [type]="source()?.endsWith('.webm') ? 'video/webm' : videoType()"
          (error)="failed.set(true)"
        />
      </video>
    }
    <div class="media-texture" aria-hidden="true"></div>
    @if (!videoSrc()) {
      <div class="media-orbit orbit-one orb" aria-hidden="true"></div>
      <div class="media-orbit orbit-two orb" aria-hidden="true"></div>
    }
    <div class="contrast-layer" aria-hidden="true"></div>
    @if (videoSrc() && !failed()) {
      <button
        class="video-control"
        [disabled]="!preferences.motion()"
        [attr.aria-label]="
          playing() ? 'Pausar video de fondo' : 'Ver en movimiento: reproducir video de fondo'
        "
        [attr.aria-pressed]="playing()"
        (click)="toggle()"
      >
        <nx-icon [name]="playing() ? 'pause' : 'play'" /><span>{{
          playing() ? 'Pausar video' : 'Ver en movimiento'
        }}</span>
      </button>
    }
  `,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      display: block;
      overflow: hidden;
      border-radius: inherit;
      background: var(--cover-base, #262039);
    }
    video,
    .media-poster {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    video {
      opacity: 0;
      transition: opacity 1s ease;
    }
    :host(.is-playing) video,
    :host(.media-ready) video {
      opacity: 1;
    }
    .media-texture {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(ellipse at 90% 20%, #b8a0df24, transparent 70%);
    }
    .contrast-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(
        90deg,
        rgba(22, 18, 33, 0.93) 0%,
        rgba(22, 18, 33, 0.78) 42%,
        rgba(22, 18, 33, 0.22) 100%
      );
    }
    .media-orbit {
      position: absolute;
      width: 460px;
      height: 460px;
      right: -120px;
      top: -230px;
      border: 1px solid #ceb5ed45;
      border-radius: 50%;
      background: #a589cd0d;
      pointer-events: none;
      animation: ambient-drift 16s ease-in-out infinite;
    }
    .orbit-two {
      width: 380px;
      height: 380px;
      top: auto;
      bottom: -310px;
      right: 35%;
      background: #d7e99409;
      border-color: #d7e99433;
      animation-delay: -6s;
      animation-duration: 21s;
    }
    @keyframes ambient-drift {
      0%,
      100% {
        transform: translate3d(0, 0, 0) rotate(0deg);
      }
      50% {
        transform: translate3d(-22px, 20px, 0) rotate(9deg);
      }
    }
    .video-control {
      position: absolute;
      right: 23px;
      bottom: 22px;
      z-index: 4;
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 44px;
      border: 1px solid #ffffff5c;
      color: #fff;
      background: #171324db;
      padding: 10px 14px;
      border-radius: 24px;
      font-size: 11px;
      font-weight: 750;
    }
    .video-control nx-icon {
      width: 15px;
      height: 15px;
    }
    .video-control:disabled {
      opacity: 1;
      color: #e6dfef;
    }
    .video-control:hover:not(:disabled) {
      background: #382851;
    }
    @media (max-width: 680px) {
      .contrast-layer {
        background: linear-gradient(180deg, #161221e8 0%, #161221c9 55%, #16122135 100%);
      }
      .video-control {
        right: 16px;
        bottom: 16px;
        font-size: 10px;
      }
    }
  `,
})
export class MultimediaBackgroundComponent {
  readonly videoSrc = input<string>();
  readonly poster = input<string>();
  readonly videoType = input('video/mp4');
  readonly priority = input(false);
  readonly autoPlay = input(true);
  readonly preferences = inject(PreferenceService);
  readonly visibility = inject(VisibleAnimationDirective);
  readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');
  readonly failed = signal(false);
  readonly posterFailed = signal(false);
  readonly playing = signal(false);
  readonly ready = signal(false);
  private readonly manual = signal(false);
  private readonly paused = signal(false);
  private readonly pageVisible = signal(!document.hidden);
  private readonly mobileQuery = window.matchMedia('(max-width: 767px)');
  private readonly mobile = signal(this.mobileQuery.matches);
  private readonly connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  readonly source = computed(() =>
    this.videoSrc() &&
    !this.failed() &&
    this.preferences.motion() &&
    this.visibility.visible() &&
    (this.manual() || (this.autoPlay() && !this.mobile() && !this.connection?.saveData))
      ? this.videoSrc()
      : undefined,
  );
  constructor() {
    const viewport = (e: MediaQueryListEvent) => this.mobile.set(e.matches);
    const visible = () => this.pageVisible.set(!document.hidden);
    this.mobileQuery.addEventListener('change', viewport);
    document.addEventListener('visibilitychange', visible);
    inject(DestroyRef).onDestroy(() => {
      this.mobileQuery.removeEventListener('change', viewport);
      document.removeEventListener('visibilitychange', visible);
      this.video()?.nativeElement.pause();
    });
    effect(() => {
      const video = this.video()?.nativeElement;
      if (!video) {
        this.playing.set(false);
        return;
      }
      if (this.source() && !this.paused() && this.pageVisible() && this.preferences.motion())
        void video.play().catch(() => this.playing.set(false));
      else video.pause();
    });
  }
  toggle(): void {
    if (this.playing()) this.paused.set(true);
    else {
      this.manual.set(true);
      this.paused.set(false);
    }
  }
}
