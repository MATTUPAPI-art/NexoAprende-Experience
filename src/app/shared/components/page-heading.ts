import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { WorldSceneComponent } from './world-scene';
import { ProfileService } from '../../core/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { MEDIA } from '../../core/constants/media-manifest';
@Component({
  selector: 'nx-page-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WorldSceneComponent],
  template: `<div class="page-heading">
    @if (sectionArt) {
      <img
        class="section-art"
        [src]="sectionArt"
        alt=""
        width="1440"
        height="810"
        decoding="async"
      />
    } @else {
      <nx-world-scene class="heading-landscape" [stage]="profiles.stage()" [eager]="true" />
    }
    <div class="heading-copy">
      <span class="eyebrow">{{ eyebrow() }}</span>
      <h1>{{ title() }}</h1>
      <p>{{ description() }}</p>
    </div>
    <ng-content />
  </div>`,
  styles: `
    .page-heading {
      isolation: isolate;
    }
    .heading-landscape {
      position: absolute;
      inset: 0 0 0 auto;
      width: 42%;
      opacity: 0.35;
      z-index: -1;
      mask-image: linear-gradient(90deg, transparent, #000 35%);
    }
    .heading-copy {
      position: relative;
      z-index: 1;
    }
    .section-art {
      position: absolute;
      inset: 0 0 0 auto;
      width: 43%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
      mask-image: linear-gradient(90deg, transparent, #000 24%);
    }
    :host:has(.section-art) .heading-copy {
      max-width: 58%;
    }
    :host:has(.section-art) .page-heading {
      min-height: 230px;
    }
    .heading-landscape svg {
      object-position: right;
    }
    @media (max-width: 680px) {
      :host:has(.section-art) .page-heading {
        padding-bottom: 175px;
      }
      :host:has(.section-art) .heading-copy {
        max-width: 100%;
      }
      .section-art {
        inset: auto 0 0;
        width: 100%;
        height: 165px;
        mask-image: linear-gradient(180deg, transparent, #000 25%);
        object-position: center 55%;
      }
      .heading-landscape {
        width: 70%;
        opacity: 0.17;
      }
    }
  `,
})
export class PageHeadingComponent {
  private readonly path = inject(ActivatedRoute).snapshot.routeConfig?.path ?? '';
  readonly sectionArt = (
    {
      panel: MEDIA.art.dashboard,
      actividades: MEDIA.art.catalog,
      progreso: MEDIA.art.progress,
      tutor: MEDIA.art.tutor,
      profesional: MEDIA.art.professional,
      'actividades/memory': MEDIA.art.memory,
      'actividades/attention': MEDIA.art.attention,
      'actividades/reading': MEDIA.art.reading,
    } as Record<string, string | undefined>
  )[this.path];
  readonly profiles = inject(ProfileService);
  readonly eyebrow = input('TU ESPACIO PARA CRECER');
  readonly title = input('');
  readonly description = input('');
}
