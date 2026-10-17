import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { IconComponent } from './icon';

@Component({
  selector: 'nx-theme-toggle',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button
    class="theme-toggle"
    (click)="themes.toggle()"
    [attr.aria-pressed]="themes.theme() === 'night'"
    [attr.aria-label]="themes.theme() === 'night' ? 'Activar modo día' : 'Activar modo noche'"
  >
    <nx-icon [name]="themes.theme() === 'night' ? 'sun' : 'moon'" /><span>{{
      themes.theme() === 'night' ? 'Modo día' : 'Modo noche'
    }}</span>
  </button>`,
  styles: `
    .theme-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 44px;
      padding: 10px 14px;
      border: 1px solid var(--border);
      border-radius: 24px;
      background: var(--surface);
      color: var(--text);
      font-size: 12px;
      font-weight: 800;
    }
    .theme-toggle:hover {
      background: var(--surface-subtle);
    }
    @media (max-width: 480px) {
      span {
        display: none;
      }
    }
  `,
})
export class ThemeToggleComponent {
  readonly themes = inject(ThemeService);
}
