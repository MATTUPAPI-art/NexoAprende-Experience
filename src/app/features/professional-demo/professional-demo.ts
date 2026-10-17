import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DEMO_PROFESSIONAL, DEMO_PROFILES, QUESTIONNAIRES } from '../../core/constants/demo-data';
import { ProgressService } from '../../core/services/progress.service';
import { ProfileService } from '../../core/services/profile.service';
import { PageHeadingComponent } from '../../shared/components/page-heading';
import { MessageComponent } from '../../shared/components/message';
import { IconComponent } from '../../shared/components/icon';
import { StageArtComponent } from '../../shared/components/stage-art';

@Component({
  selector: 'nx-professional-demo',
  imports: [
    FormsModule,
    RouterLink,
    PageHeadingComponent,
    MessageComponent,
    IconComponent,
    StageArtComponent,
  ],
  template: `
    <nx-page-heading
      eyebrow="OTRA MIRADA PARA ACOMPAÑAR"
      title="Conectados por el aprendizaje."
      description="Vista inicial del espacio profesional: perfiles, experiencias y conversaciones educativas."
    />
    <section class="companion-heading professional-heading">
      <div>
        <span class="eyebrow">OBSERVAR / CONVERSAR / ACOMPAÑAR</span>
        <h2>Otra mirada.<br />Más posibilidades.</h2>
        <p>Un espacio para comprender el recorrido, sin reducirlo a una puntuación.</p>
      </div>
      <figure class="companion-photo">
        <nx-stage-art stage="teen" kind="photo" [eager]="true" />
        <figcaption>Ambientes reales para aprender y explorar.</figcaption>
      </figure>
    </section>
    <nx-message [demo]="true" title="Panel profesional · Demostración"
      >{{ professional.name }} es un perfil ficticio de {{ professional.specialty.toLowerCase() }}.
      Las autorizaciones son simuladas; no hay acceso a información de otras personas.</nx-message
    >
    <div class="two-column">
      <section class="panel">
        <div class="section-heading">
          <h2>Perfiles autorizados</h2>
          <span class="badge badge-warm">Vínculos simulados</span>
        </div>
        @for (profile of demoProfiles; track profile.id) {
          <div class="profile-row">
            <span class="avatar">{{
              profile.id === 'local-explorer'
                ? profiles.profile().name.charAt(0).toUpperCase()
                : profile.name.charAt(0)
            }}</span>
            <div>
              <h3>
                {{ profile.id === 'local-explorer' ? profiles.profile().name : profile.name }}
              </h3>
              <p>
                {{ profile.id === 'local-explorer' ? profiles.profile().age : profile.age }} años ·
                Autorización de ejemplo
              </p>
            </div>
            <span class="badge">{{ profile.id === 'local-explorer' ? 'Local' : 'Ficticio' }}</span>
          </div>
        }
      </section>
      <section class="panel">
        <span class="round-icon sage"><nx-icon name="chart" /></span>
        <h2>Resumen descriptivo</h2>
        <p class="small muted">
          El perfil local tiene {{ progress.summary().sessions }} sesiones de memoria completadas.
          Se registran parejas encontradas, intentos sin coincidencia y tiempo de juego.
        </p>
        <a routerLink="/progreso" class="text-link"
          >Consultar resultados locales<nx-icon name="arrow"
        /></a>
        <p class="small muted">
          Los datos no permiten inferir capacidades generales ni condiciones clínicas.
        </p>
      </section>
    </div>
    <div class="section-heading">
      <div>
        <span class="eyebrow">PREGUNTAR PARA COMPRENDER</span>
        <h2>Guías de conversación</h2>
      </div>
      <span class="badge">Cuestionarios demostrativos</span>
    </div>
    <div class="two-column">
      @for (questionnaire of questionnaires; track questionnaire.id) {
        <section class="panel">
          <span class="round-icon warm"><nx-icon name="book" /></span>
          <h3>{{ questionnaire.title }}</h3>
          <p class="small muted">{{ questionnaire.description }}</p>
          <button
            class="button button-secondary"
            [attr.aria-expanded]="opened() === questionnaire.id"
            (click)="opened.set(opened() === questionnaire.id ? '' : questionnaire.id)"
          >
            {{ opened() === questionnaire.id ? 'Cerrar guía' : 'Ver preguntas de ejemplo'
            }}<nx-icon name="chevron" />
          </button>
          @if (opened() === questionnaire.id) {
            <ol class="check-list">
              @for (question of questionnaire.questions; track question) {
                <li>{{ question }}</li>
              }
            </ol>
            <p class="small muted">
              Vista de lectura: no recoge respuestas ni calcula puntuaciones.
            </p>
          }
        </section>
      }
    </div>
  `,
})
export class ProfessionalDemoComponent {
  readonly professional = DEMO_PROFESSIONAL;
  readonly demoProfiles = DEMO_PROFILES;
  readonly questionnaires = QUESTIONNAIRES;
  readonly opened = signal('');
  readonly progress = inject(ProgressService);
  readonly profiles = inject(ProfileService);
}
