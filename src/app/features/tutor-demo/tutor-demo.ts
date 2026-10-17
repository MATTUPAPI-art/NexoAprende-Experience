import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DEMO_PROFILES } from '../../core/constants/demo-data';
import { ProfileService } from '../../core/services/profile.service';
import { ProgressService } from '../../core/services/progress.service';
import { PageHeadingComponent } from '../../shared/components/page-heading';
import { MessageComponent } from '../../shared/components/message';
import { IconComponent } from '../../shared/components/icon';

@Component({
  selector: 'nx-tutor-demo',
  imports: [RouterLink, PageHeadingComponent, MessageComponent, IconComponent],
  template: `
    <nx-page-heading
      eyebrow="APRENDEMOS EN EQUIPO"
      title="Acompañar también es aprender."
      description="Un primer vistazo al espacio de las familias y personas que acompañan."
    />
    <nx-message [demo]="true" title="Panel del tutor · Demostración"
      >Los perfiles y vínculos son ejemplos sin cuentas ni autorización real. Solo el resumen de
      {{ profiles.profile().name }} utiliza partidas locales completadas.</nx-message
    >
    <div class="two-column">
      <section class="panel">
        <div class="section-heading">
          <h2>Perfiles del ejemplo</h2>
          <span class="badge">2 perfiles</span>
        </div>
        <div class="profile-row">
          <span class="avatar">{{ profiles.profile().name.charAt(0).toUpperCase() }}</span>
          <div>
            <h3>{{ profiles.profile().name }}</h3>
            <p>{{ profiles.profile().age }} años · Perfil de este navegador</p>
          </div>
          <a routerLink="/progreso" class="text-link">Ver progreso<nx-icon name="arrow" /></a>
        </div>
        <div class="profile-row">
          <span class="avatar">L</span>
          <div>
            <h3>{{ demoProfiles[1].name }}</h3>
            <p>{{ demoProfiles[1].age }} años · Perfil ficticio sin sesiones</p>
          </div>
          <span class="badge badge-warm">Ejemplo</span>
        </div>
      </section>
      <section class="panel">
        <span class="round-icon lavender"><nx-icon name="chart" /></span>
        <h2>Una mirada a sus actividades</h2>
        <p class="small muted">
          {{ profiles.profile().name }} ha completado {{ progress.summary().sessions }} partidas de
          memoria y encontrado {{ progress.summary().matches }} parejas en este dispositivo.
        </p>
        <a routerLink="/progreso" class="text-link"
          >Explorar el historial local<nx-icon name="arrow"
        /></a>
      </section>
    </div>
    <section class="panel">
      <span class="eyebrow">PEQUEÑOS GESTOS, GRANDES CONEXIONES</span>
      <h2>Ideas para acompañar con calma</h2>
      <ul class="list-clean">
        <li>
          <strong>Reconoce el esfuerzo.</strong> Un “me gustó cómo lo intentaste” puede valer más
          que una puntuación.
        </li>
        <li>
          <strong>Deja espacio para las pausas.</strong> No hay un tiempo correcto para aprender.
        </li>
        <li>
          <strong>Pregunta qué descubrió.</strong> Conversar sobre la actividad también forma parte
          de la experiencia.
        </li>
        <li>
          <strong>Adapten el espacio juntos.</strong> Elijan la edad, reduzcan las animaciones y
          prueben la navegación con teclado.
        </li>
      </ul>
    </section>
    <div class="tutor-disclaimer">
      <nx-message
        >Este espacio acompaña el aprendizaje. No ofrece diagnósticos, tratamiento ni evaluación
        psicológica.</nx-message
      >
    </div>
  `,
  styles: `
    .panel > .round-icon + h2 {
      font-size: 23px;
    }
    .tutor-disclaimer {
      margin-top: 24px;
    }
    .profile-row > .text-link {
      margin-left: auto;
    }
    @media (max-width: 680px) {
      .profile-row {
        flex-wrap: wrap;
      }
      .profile-row > .text-link {
        margin-left: 49px;
      }
    }
  `,
})
export class TutorDemoComponent {
  readonly profiles = inject(ProfileService);
  readonly progress = inject(ProgressService);
  readonly demoProfiles = DEMO_PROFILES;
}
