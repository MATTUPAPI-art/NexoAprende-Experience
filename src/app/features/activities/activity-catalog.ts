import { Component, computed, inject, signal } from '@angular/core';
import { ActivityService } from '../../core/services/activity.service';
import { ActivityCardComponent } from '../../shared/components/activity-card';
import { PageHeadingComponent } from '../../shared/components/page-heading';
import { MessageComponent } from '../../shared/components/message';

@Component({
  selector: 'nx-activity-catalog',
  imports: [ActivityCardComponent, PageHeadingComponent, MessageComponent],
  template: `
    <nx-page-heading
      eyebrow="UN MUNDO POR EXPLORAR"
      title="Elige tu próxima aventura."
      description="Atención, memoria y lectura. Tres caminos para seguir descubriendo tus habilidades."
    />
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
    <div class="activity-grid">
      @for (activity of filtered(); track activity.id) {
        <nx-activity-card [activity]="activity" />
      }
    </div>
  `,
})
export class ActivityCatalogComponent {
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
