import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  viewChild,
  effect,
} from '@angular/core';
import { PreferenceService } from '../../core/services/preference.service';
import { VisibleAnimationDirective } from '../directives/visible-animation';

/** Pass a real local mp4/webm URL to videoSrc; without it no media is requested. */
@Component({
  selector: 'nx-multimedia-background',
  hostDirectives: [VisibleAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@if (videoSrc() && !failed) {
      <video
        #video
        muted
        loop
        playsinline
        preload="none"
        [poster]="poster()"
        (error)="failed = true"
      >
        <source [src]="videoSrc()" [type]="videoType()" (error)="failed = true" />
      </video>
    }
    <div class="orb orb-one"></div>
    <div class="orb orb-two"></div>
    <div class="contrast-layer"></div>`,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      border-radius: inherit;
      background: #7760b7;
    }
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      inset: 0;
    }
    .contrast-layer {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(66, 43, 109, 0.25), transparent);
    }
    .orb {
      position: absolute;
      border-radius: 50%;
      border: 1px solid #ffffff12;
      animation: float 10s ease-in-out infinite;
    }
    .orb-one {
      width: 440px;
      height: 440px;
      right: -90px;
      top: -90px;
      background: #b69beb16;
    }
    .orb-two {
      width: 360px;
      height: 360px;
      right: 25%;
      bottom: -310px;
      background: #cdb8f922;
      animation-delay: -4s;
    }
  `,
})
export class MultimediaBackgroundComponent {
  readonly videoSrc = input<string>();
  readonly poster = input<string>();
  readonly videoType = input('video/mp4');
  readonly preferences = inject(PreferenceService);
  readonly visibility = inject(VisibleAnimationDirective);
  readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');
  failed = false;
  constructor() {
    effect(() => {
      const element = this.video()?.nativeElement;
      if (!element) return;
      if (this.preferences.motion() && this.visibility.visible()) {
        void element.play().catch(() => element.pause());
      } else element.pause();
    });
  }
}
