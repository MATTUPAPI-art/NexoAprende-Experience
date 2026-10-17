import { ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
  selector: 'nx-page-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="page-heading">
    <div>
      <span class="eyebrow">{{ eyebrow() }}</span>
      <h1>{{ title() }}</h1>
      <p>{{ description() }}</p>
    </div>
    <ng-content />
  </div>`,
})
export class PageHeadingComponent {
  readonly eyebrow = input('TU ESPACIO PARA CRECER');
  readonly title = input('');
  readonly description = input('');
}
