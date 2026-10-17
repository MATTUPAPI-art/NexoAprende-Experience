import { ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
  selector: 'nx-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div
    class="progress-track"
    role="progressbar"
    [attr.aria-label]="label()"
    [attr.aria-valuenow]="value()"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <span [style.width.%]="value()"></span>
  </div>`,
})
export class ProgressBarComponent {
  readonly value = input(0);
  readonly label = input('Progreso');
}
