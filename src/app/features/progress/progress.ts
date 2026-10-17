import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../core/services/progress.service';
import { PageHeadingComponent } from '../../shared/components/page-heading';
import { ProgressBarComponent } from '../../shared/components/progress-bar';
import { MessageComponent } from '../../shared/components/message';
import { IconComponent } from '../../shared/components/icon';
import { DurationPipe } from '../../shared/pipes/duration';

@Component({
  selector: 'nx-progress',
  host: { class: 'progress-page' },
  imports: [
    DatePipe,
    DecimalPipe,
    RouterLink,
    PageHeadingComponent,
    ProgressBarComponent,
    MessageComponent,
    IconComponent,
    DurationPipe,
  ],
  template: `
    <nx-page-heading
      eyebrow="CADA PEQUEÑO PASO CUENTA"
      title="Tu camino de descubrimientos."
      description="Una mirada a lo que has explorado. Sin comparaciones: tu ritmo es el que importa."
      ><a routerLink="/actividades/memory" class="button button-primary"
        >Una nueva aventura<nx-icon name="arrow" /></a
    ></nx-page-heading>
    <nx-message title="Tus experiencias, contadas con calma"
      >Estos datos pertenecen a las partidas de memoria completadas en este navegador. El tiempo y
      los intentos describen cada sesión, sin interpretación clínica.</nx-message
    >
    <div class="stat-grid">
      <div class="stat-card">
        <span class="stat-label"><nx-icon name="grid" />Sesiones</span
        ><strong class="stat-value">{{ progress.summary().sessions }}</strong
        ><small>Partidas completadas</small>
      </div>
      <div class="stat-card">
        <span class="stat-label"><nx-icon name="check" />Aciertos</span
        ><strong class="stat-value">{{ progress.summary().matches }}</strong
        ><small>Parejas encontradas</small>
      </div>
      <div class="stat-card">
        <span class="stat-label"><nx-icon name="reset" />Intentos sin pareja</span
        ><strong class="stat-value">{{ progress.summary().errors }}</strong
        ><small>Oportunidades para recordar</small>
      </div>
      <div class="stat-card">
        <span class="stat-label"><nx-icon name="clock" />Tiempo de juego</span
        ><strong class="stat-value time-total">{{ progress.summary().seconds | duration }}</strong
        ><small>Sin contar las pausas</small>
      </div>
    </div>
    <div class="two-column">
      <section class="panel">
        <div class="section-heading compact">
          <h2>Mi meta semanal</h2>
          <span class="badge">Nivel inicial</span>
        </div>
        <p class="small muted">
          3 sesiones en los últimos 7 días. Una invitación a explorar, sin obligación.
        </p>
        <div class="goal-title">
          <strong>Tu recorrido</strong><span>{{ progress.weeklyGoal() | number: '1.0-0' }}%</span>
        </div>
        <nx-progress-bar [value]="progress.weeklyGoal()" label="Meta semanal" />
        <p class="small muted">
          {{
            progress.weeklyGoal() >= 100
              ? '¡Exploraste tres o más aventuras esta semana! Si te apetece, sigue descubriendo.'
              : 'Cada aventura que terminas es un pequeño paso. Tú eliges cuándo dar el siguiente.'
          }}
        </p>
      </section>
      <section class="panel">
        <span class="round-icon sage"><nx-icon name="leaf" /></span>
        <h2>Aprender también es volver a intentar.</h2>
        <p class="small muted">
          Las parejas que no coinciden ayudan a conocer el tablero. Puedes jugar de nuevo, tomar una
          pausa o explorar otra experiencia.
        </p>
      </section>
    </div>
    <section class="panel">
      <div class="section-heading">
        <h2>Mis aventuras recientes</h2>
        <span class="badge badge-green">Datos locales reales</span>
      </div>
      @if (progress.results().length) {
        <div class="table-scroll">
          <table>
            <caption class="sr-only">
              Historial de partidas de memoria completadas
            </caption>
            <thead>
              <tr>
                <th scope="col">Actividad y fecha</th>
                <th scope="col">Nivel</th>
                <th scope="col">Aciertos</th>
                <th scope="col">Sin pareja</th>
                <th scope="col">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              @for (result of progress.results(); track result.id) {
                <tr>
                  <td>
                    <strong>Encuentra las parejas</strong><br /><span class="muted">{{
                      result.completedAt | date: 'dd/MM/yyyy · HH:mm'
                    }}</span>
                  </td>
                  <td>
                    <span class="badge">{{ result.level }}</span>
                  </td>
                  <td>{{ result.matches }}</td>
                  <td>{{ result.errors }}</td>
                  <td>{{ result.seconds | duration }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <div class="empty-state">
          <nx-icon name="sparkles" />
          <h3>Una página en blanco, muchas posibilidades.</h3>
          <p>Completa tu primera partida de memoria y verás aquí tu aventura.</p>
          <a routerLink="/actividades/memory" class="button button-primary"
            >Encontrar mis primeras parejas<nx-icon name="arrow"
          /></a>
        </div>
      }
    </section>
  `,
  styles: `
    .goal-title {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      margin: 24px 0 12px;
    }
    .goal-title > span {
      font-weight: 800;
      color: var(--primary);
    }
    .stat-card .time-total {
      font-size: 24px;
    }
    .panel > .round-icon + h2 {
      font-size: 22px;
      margin-bottom: 8px;
    }
  `,
})
export class ProgressComponent {
  readonly progress = inject(ProgressService);
}
