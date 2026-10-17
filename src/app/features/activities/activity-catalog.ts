import { Component, computed, inject, signal } from '@angular/core';
import { ActivityService } from '../../core/services/activity.service';
import { ActivityCardComponent } from '../../shared/components/activity-card';
import { PageHeadingComponent } from '../../shared/components/page-heading';
import { MessageComponent } from '../../shared/components/message';
import { MultimediaBackgroundComponent } from '../../shared/components/multimedia-background';
import { MEDIA } from '../../core/constants/media-manifest';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'nx-activity-catalog',
  imports: [
    ActivityCardComponent,
    PageHeadingComponent,
    MessageComponent,
    MultimediaBackgroundComponent,
  ],
  template: `
    <nx-page-heading
      eyebrow="UN MUNDO POR EXPLORAR"
      title="Elige tu próxima aventura."
      description="Atención, memoria y lectura. Tres caminos para seguir descubriendo tus habilidades."
    />
    <section class="catalog-note">
      <span class="catalog-volume" aria-hidden="true">Nº 01</span>
      <div>
        <span class="eyebrow">LA COLECCIÓN DE LA CURIOSIDAD</span>
        <p>Observar con otros ojos. Conectar lo que recuerdas. Encontrar una idea entre líneas.</p>
      </div>
      <span class="catalog-count">3 áreas<br /><strong>muchas posibilidades.</strong></span>
    </section>
    <nx-message [demo]="true" title="Tu primera colección de experiencias"
      >El juego de memoria ya está disponible. Atención y lectura tienen vistas previas; sus
      mecánicas llegarán en el siguiente hito.</nx-message
    >
    <div class="filter-row" aria-label="Filtrar actividades">
      @for (filter of filters; track filter.id) {
        <button
          class="filter-button"
          [class.selected]="selected() === filter.id"
          [attr.aria-pressed]="selected() === filter.id"
          (click)="selected.set(filter.id)"
        >
          {{ filter.label }}
        </button>
      }
    </div>
    <p class="small muted" aria-live="polite">
      {{ filtered().length }}
      {{ filtered().length === 1 ? 'experiencia para descubrir' : 'experiencias para descubrir' }}
    </p>
    <div class="activity-grid catalog-grid" [class.is-all]="selected() === 'all'">
      @for (activity of filtered(); track activity.id) {
        <nx-activity-card [activity]="activity" />
      }
    </div>
    @if (media.activities) {
      <section class="activity-film" aria-labelledby="film-title">
        <nx-multimedia-background
          [videoSrc]="media.activities"
          [poster]="media.stages[profiles.stage()]"
          [priority]="true"
          [autoPlay]="false"
        />
        <div class="film-copy">
          <span class="eyebrow">APRENDER TAMBIÉN PASA FUERA DE LA PANTALLA</span>
          <h2 id="film-title">Ideas en movimiento.</h2>
          <p>Una pausa para mirar, imaginar y volver con nuevas ganas.</p>
        </div>
      </section>
    }
  `,
  styles: `
    .catalog-note {
      display: flex;
      align-items: center;
      gap: 23px;
      padding: 24px 0 28px;
      margin-bottom: 23px;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }
    .catalog-volume {
      font-family: var(--font-heading);
      font-size: 45px;
      color: var(--primary);
      white-space: nowrap;
    }
    .catalog-note p {
      max-width: 460px;
      font-size: 16px;
      line-height: 1.5;
      margin: 9px 0 0;
    }
    .catalog-count {
      margin-left: auto;
      font-size: 11px;
      color: var(--muted);
      line-height: 1.8;
    }
    .catalog-count strong {
      color: var(--text);
      font-size: 12px;
    }
    .activity-film {
      margin-top: 35px;
      min-height: 300px;
      border-radius: 4px 4px 45px 4px;
      background: #252132;
      isolation: isolate;
      position: relative;
      overflow: hidden;
      color: white;
    }
    .film-copy {
      position: relative;
      pointer-events: none;
      max-width: 460px;
      padding: 38px;
    }
    .film-copy .eyebrow {
      color: #e1cfaa;
    }
    .film-copy h2 {
      font-size: 40px;
      line-height: 1.1;
    }
    .film-copy p {
      font-size: 13px;
      color: #eee4f8;
    }
    @media (max-width: 680px) {
      .catalog-note {
        gap: 15px;
        align-items: flex-start;
      }
      .catalog-volume {
        font-size: 32px;
      }
      .catalog-note p {
        font-size: 14px;
      }
      .catalog-count {
        display: none;
      }
      .film-copy {
        padding: 28px;
      }
      .film-copy h2 {
        font-size: 35px;
      }
      .activity-film {
        min-height: 340px;
      }
    }
  `,
})
export class ActivityCatalogComponent {
  readonly media = MEDIA;
  readonly profiles = inject(ProfileService);
  private readonly activityService = inject(ActivityService);
  readonly selected = signal('all');
  readonly filters = [
    { id: 'all', label: 'Todas las experiencias' },
    { id: 'attention', label: 'Atención' },
    { id: 'memory', label: 'Memoria' },
    { id: 'reading', label: 'Lectura' },
  ];
  readonly filtered = computed(() =>
    this.activityService.activities.filter(
      (a) => this.selected() === 'all' || a.id === this.selected(),
    ),
  );
}
