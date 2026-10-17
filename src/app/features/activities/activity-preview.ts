import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ActivityService } from '../../core/services/activity.service';
import { PageHeadingComponent } from '../../shared/components/page-heading';
import { IllustrationComponent } from '../../shared/components/illustration';
import { MessageComponent } from '../../shared/components/message';
import { IconComponent } from '../../shared/components/icon';

@Component({
  selector: 'nx-activity-preview',
  imports: [
    RouterLink,
    PageHeadingComponent,
    IllustrationComponent,
    MessageComponent,
    IconComponent,
  ],
  template: `
    <a routerLink="/actividades" class="link-back"><nx-icon name="back" />Todas las experiencias</a
    ><nx-page-heading
      [eyebrow]="activity.area.toUpperCase() + ' · VISTA PREVIA'"
      [title]="activity.name"
      [description]="activity.description"
    />
    <nx-message [demo]="true" title="Un vistazo a lo que viene"
      >Esta presentación es una demostración. La actividad todavía no se puede jugar. Duración
      prevista: {{ activity.minutes }} minutos · Nivel inicial.</nx-message
    >
    <div class="two-column">
      <div class="preview-art" [class]="'preview-art ' + activity.id">
        <nx-illustration [scene]="activity.id" />
      </div>
      <section class="panel">
        <span class="badge badge-warm">Próximo hito</span>
        <h2>Así será la experiencia</h2>
        @if (activity.id === 'attention') {
          <ol class="check-list">
            <li>Observa un tablero de animales y formas.</li>
            <li>Busca a los perros entre las imágenes.</li>
            <li>Selecciona cada perro a tu ritmo.</li>
            <li>Descubre cuántos encontraste al terminar.</li>
          </ol>
          <p class="small muted">
            Objetivo educativo: practicar la observación y la atención visual.
          </p>
        } @else {
          <ol class="check-list">
            <li>Lee una historia breve adaptada a tu etapa.</li>
            <li>Vuelve al texto cuando lo necesites.</li>
            <li>Responde preguntas sobre sus personajes e ideas.</li>
            <li>Explora las respuestas con una explicación.</li>
          </ol>
          <p class="small muted">Objetivo educativo: practicar la comprensión de lo que leemos.</p>
        }
        <a routerLink="/actividades/memory" class="button button-primary"
          >Probar el juego de memoria<nx-icon name="arrow"
        /></a>
      </section>
    </div>
    @if (activity.id === 'reading') {
      <section class="panel">
        <span class="eyebrow">UN PEQUEÑO ADELANTO · TEXTO DE EJEMPLO</span>
        <h2>La semilla de Leo</h2>
        <p class="reading-sample">
          Leo encontró una pequeña semilla junto al camino. La llevó a casa, le buscó una maceta y
          la regó cada mañana. Durante varios días no vio ningún cambio. Una tarde, al volver de la
          escuela, descubrió una hojita verde. Sonrió: las cosas pequeñas también necesitan tiempo
          para crecer.
        </p>
        <p class="small muted">
          Para conversar: ¿Qué hizo Leo para cuidar la semilla? Las preguntas interactivas estarán
          disponibles en el segundo hito.
        </p>
      </section>
    }
  `,
  styles: `
    .preview-art {
      display: grid;
      place-items: center;
      background: #e8f1e9;
      border: 1px solid #dce7df;
      border-radius: var(--radius);
      min-height: 320px;
    }
    .preview-art nx-illustration {
      max-width: 410px;
    }
    .preview-art.reading {
      background: #faf0dc;
      border-color: #f1e6cf;
    }
    .reading-sample {
      max-width: 700px;
      font-size: 16px;
      line-height: 2;
    }
    .panel > .button {
      margin-top: 15px;
    }
  `,
})
export class ActivityPreviewComponent {
  private readonly route = inject(ActivatedRoute);
  readonly activity = inject(ActivityService).find(
    this.route.snapshot.routeConfig?.path?.endsWith('attention') ? 'attention' : 'reading',
  )!;
}
