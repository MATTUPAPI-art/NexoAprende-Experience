import { Component, inject, input } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { WorldSceneComponent } from './world-scene';
import { NexitoComponent } from './nexito';
@Component({
  selector: 'nx-world-banner',
  imports: [WorldSceneComponent, NexitoComponent],
  template: `<section class="world-banner" [attr.data-world]="profiles.stage()">
    <nx-world-scene [stage]="profiles.stage()" [eager]="true" />
    <div class="world-banner-copy">
      <span class="eyebrow">{{ eyebrow() }}</span>
      <h2>{{ title() }}</h2>
      <p>{{ description() }}</p>
      <ng-content />
    </div>
    <div class="world-banner-friend"><nx-nexito mood="greet" /></div>
  </section>`,
  styles: `
    .world-banner {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      border-radius: 28px;
      min-height: 265px;
      background: var(--world-surface);
      color: var(--world-ink);
    }
    .world-banner > nx-world-scene {
      position: absolute;
      inset: 0;
    }
    .world-banner-copy {
      position: relative;
      z-index: 1;
      max-width: 62%;
      padding: 33px 37px;
    }
    .world-banner h2 {
      font-size: 34px;
      line-height: 1.12;
      margin: 15px 0 13px;
      max-width: 560px;
    }
    .world-banner p {
      font-size: 13px;
      line-height: 1.8;
      max-width: 470px;
      margin: 0;
      color: var(--world-muted);
    }
    .world-banner .eyebrow {
      color: var(--world-muted);
    }
    .world-banner-friend {
      position: absolute;
      right: 5%;
      bottom: -12px;
      width: 165px;
    }
    .world-banner-friend nx-nexito {
      width: 100%;
    }
    @media (max-width: 680px) {
      .world-banner {
        min-height: 290px;
        border-radius: 23px;
      }
      .world-banner-copy {
        max-width: 78%;
        padding: 25px;
      }
      .world-banner h2 {
        font-size: 27px;
      }
      .world-banner p {
        font-size: 12px;
        max-width: 200px;
      }
      .world-banner-friend {
        width: 118px;
        right: 0;
        bottom: -8px;
      }
      .world-banner > nx-world-scene {
        width: 150%;
        left: -35%;
      }
    }
  `,
})
export class WorldBannerComponent {
  readonly profiles = inject(ProfileService);
  readonly eyebrow = input('APRENDER TIENE MUCHAS FORMAS');
  readonly title = input('Tu curiosidad marca el camino.');
  readonly description = input('Un espacio para probar, equivocarte y volver a descubrir.');
}
