import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Activity } from '../../core/models/models';
import { IllustrationComponent } from './illustration';
import { IconComponent } from './icon';
import { DepthDirective } from '../directives/depth';
@Component({
  selector: 'nx-activity-card',
  imports: [RouterLink, IllustrationComponent, IconComponent, DepthDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<article nxDepth class="activity-card" [class]="'activity-card ' + activity().id">
    <div class="activity-art">
      <span class="activity-area"><nx-icon [name]="activity().icon" />{{ activity().area }}</span>
      <nx-illustration [scene]="activity().id" />
      <span class="activity-index" aria-hidden="true">{{
        activity().id === 'memory' ? '02' : activity().id === 'attention' ? '01' : '03'
      }}</span
      ><span class="activity-status" [class.ready]="activity().available">{{
        activity().available ? 'Disponible' : 'Demostración'
      }}</span>
    </div>
    <div class="activity-body">
      <span class="card-kicker">{{ activity().tag }}</span>
      <h3>{{ activity().name }}</h3>
      <p>{{ activity().description }}</p>
      <div class="activity-meta">
        <span><nx-icon name="clock" />{{ activity().minutes }} min</span
        ><span><i></i>{{ activity().difficulty }}</span>
      </div>
      <a [routerLink]="'/actividades/' + activity().id" class="activity-link"
        >{{ activity().available ? 'Comenzar aventura' : 'Conocer la actividad'
        }}<nx-icon name="arrow"
      /></a>
    </div>
  </article>`,
})
export class ActivityCardComponent {
  readonly activity = input.required<Activity>();
}
