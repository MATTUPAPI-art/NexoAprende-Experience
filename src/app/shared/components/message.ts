import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from './icon';
@Component({
  selector: 'nx-message',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<aside class="notice" [class.notice-demo]="demo()">
    <nx-icon [name]="demo() ? 'sparkles' : 'shield'" />
    <div>
      <strong>{{ title() }}</strong>
      <p><ng-content /></p>
    </div>
  </aside>`,
})
export class MessageComponent {
  readonly demo = input(false);
  readonly title = input('Cada persona aprende a su ritmo');
}
