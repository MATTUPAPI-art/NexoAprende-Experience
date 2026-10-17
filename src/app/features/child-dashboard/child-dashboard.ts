import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DEMO_WEEK } from '../../core/constants/demo-data';
import { ProfileService } from '../../core/services/profile.service';
import { PreferenceService } from '../../core/services/preference.service';
import { ProgressService } from '../../core/services/progress.service';
import { ActivityService } from '../../core/services/activity.service';
import { ActivityCardComponent } from '../../shared/components/activity-card';
import { PageHeadingComponent } from '../../shared/components/page-heading';
import { MessageComponent } from '../../shared/components/message';
import { ProgressBarComponent } from '../../shared/components/progress-bar';
import { IconComponent } from '../../shared/components/icon';
import { WorldBannerComponent } from '../../shared/components/world-banner';

@Component({
  selector: 'nx-child-dashboard',
  imports: [
    RouterLink,
    DatePipe,
    DecimalPipe,
    ActivityCardComponent,
    PageHeadingComponent,
    MessageComponent,
    ProgressBarComponent,
    IconComponent,
    WorldBannerComponent,
  ],
  template: `
    <nx-page-heading
      eyebrow="ESTE ESPACIO ES TUYO"
      [title]="'¡Seguimos descubriendo, ' + profiles.profile().name + '!'"
      description="No hace falta hacerlo perfecto. Lo bonito es intentarlo."
      ><a routerLink="/experiencia" class="button button-secondary"
        >Editar mi experiencia<nx-icon name="settings" /></a
    ></nx-page-heading>
    <nx-world-banner
      [eyebrow]="
        profiles.stage() === 'child'
          ? 'TU AVENTURA ESTÁ POR COMENZAR'
          : profiles.stage() === 'teen'
            ? 'HOY, A TU MANERA'
            : 'SE BUSCAN NUEVAS IDEAS'
      "
      [title]="
        profiles.stage() === 'child'
          ? 'Las mejores ideas empiezan jugando.'
          : profiles.stage() === 'teen'
            ? 'Un poco de foco. Mucho por descubrir.'
            : 'Tu próxima pregunta puede llevarte lejos.'
      "
      description="No hay un camino único. Elige una experiencia y descubre qué puedes construir hoy."
    />
    <div class="dashboard-profile panel">
      <span class="avatar avatar-large">{{ profiles.profile().name.charAt(0).toUpperCase() }}</span>
      <div>
        <h2>{{ profiles.profile().name }}</h2>
        <p>
          {{ profiles.profile().age }} años · {{ profiles.stageLabel() }} ·
          {{ profiles.configured() ? 'Perfil local' : 'Perfil de ejemplo' }}
        </p>
      </div>
      <span class="badge">Explorador en marcha</span>
    </div>
    <div class="two-column">
      <section class="panel">
        <div class="section-heading compact">
          <h2>Mi semana de descubrimientos</h2>
          <span class="badge badge-warm">Ejemplo visual</span>
        </div>
        <p class="small muted">
          Así podría verse una semana de aprendizaje. Estos valores son simulados.
        </p>
        <div
          class="week-chart"
          role="img"
          aria-label="Gráfico simulado semanal: lunes 38, martes 68, miércoles 46, jueves 88, viernes 62, sábado 24, domingo 0 por ciento."
        >
          @for (day of week; track $index) {
            <div>
              <span class="week-track"><i [style.height.%]="day.value"></i></span
              ><span>{{ day.label }}</span>
            </div>
          }
        </div>
      </section>
      <section class="panel">
        <div class="section-heading compact">
          <h2>Mi próxima pequeña meta</h2>
          <nx-icon name="star" />
        </div>
        <p class="small muted">Completar 3 aventuras durante los últimos 7 días.</p>
        <div class="goal-number">{{ progress.weeklyGoal() | number: '1.0-0' }}<small>%</small></div>
        <nx-progress-bar [value]="progress.weeklyGoal()" label="Meta de tres aventuras" />
        <p class="small muted">
          {{ progress.summary().sessions }} sesiones reales registradas en este navegador.
        </p>
        <a routerLink="/progreso" class="text-link">Ver mi progreso<nx-icon name="arrow" /></a>
      </section>
    </div>
    <div class="section-heading">
      <div>
        <span class="eyebrow">TU PRÓXIMA AVENTURA</span>
        <h2>Elegidas para explorar</h2>
      </div>
      <a routerLink="/actividades" class="text-link">Ver todas<nx-icon name="arrow" /></a>
    </div>
    <div class="activity-grid">
      @for (activity of activities.activities; track activity.id) {
        <nx-activity-card [activity]="activity" />
      }
    </div>
    <div class="two-column">
      <section class="panel">
        <h2>Mi último descubrimiento</h2>
        @if (progress.results()[0]; as latest) {
          <p>Encuentra las parejas · {{ latest.completedAt | date: 'dd/MM/yyyy HH:mm' }}</p>
          <p class="small muted">
            {{ latest.matches }} parejas encontradas y {{ latest.errors }} intentos sin pareja. Cada
            intento también enseña.
          </p>
        } @else {
          <p class="small muted">
            Todavía no has completado una actividad. El juego de memoria te está esperando.
          </p>
        }
        <a routerLink="/actividades/memory" class="text-link"
          >Ir a memoria<nx-icon name="arrow"
        /></a>
      </section>
      <section class="panel">
        <h2>La calma también cuenta</h2>
        <p class="small muted">Puedes tomar una pausa y reducir el movimiento cuando quieras.</p>
        <button
          class="button button-secondary"
          [disabled]="preferences.systemReduced()"
          [attr.aria-pressed]="!preferences.motion()"
          (click)="preferences.toggleMotion()"
        >
          <nx-icon name="leaf" />{{
            preferences.motion() ? 'Reducir animaciones' : 'Movimiento reducido activo'
          }}
        </button>
      </section>
    </div>
    <nx-message
      >Las actividades y los resultados describen esta experiencia de aprendizaje; no evalúan ni
      diagnostican condiciones médicas o psicológicas.</nx-message
    >
  `,
  styles: `
    .dashboard-profile {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .dashboard-profile h2 {
      margin: 0 0 5px;
    }
    .dashboard-profile p {
      margin: 0;
      font-size: 12px;
      color: var(--muted);
    }
    .dashboard-profile > .badge {
      margin-left: auto;
    }
    .week-chart {
      height: 133px;
      display: flex;
      justify-content: space-around;
      gap: 12px;
      margin-top: 18px;
    }
    .week-chart > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      font-size: 10px;
      color: var(--muted);
    }
    .week-track {
      height: 103px;
      width: 23px;
      border-radius: 6px;
      background: #f4f1f8;
      position: relative;
      overflow: hidden;
    }
    .week-track i {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-radius: 6px;
      background: #b39cc9;
    }
    .week-chart > div:nth-child(4) i {
      background: #7b61a8;
    }
    .goal-number {
      font-family: var(--font-heading);
      font-size: 45px;
      color: var(--primary);
      margin: 15px 0;
    }
    .goal-number small {
      font-size: 20px;
    }
    @media (max-width: 680px) {
      .dashboard-profile {
        gap: 12px;
        flex-wrap: wrap;
      }
      .dashboard-profile > .badge {
        margin-left: 0;
      }
      .dashboard-profile h2 {
        font-size: 21px;
      }
    }
  `,
})
export class ChildDashboardComponent {
  readonly profiles = inject(ProfileService);
  readonly preferences = inject(PreferenceService);
  readonly progress = inject(ProgressService);
  readonly activities = inject(ActivityService);
  readonly week = DEMO_WEEK;
}
