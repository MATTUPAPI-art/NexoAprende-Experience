import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { PreferenceService } from '../../core/services/preference.service';

/** Small, frame-limited pointer response. No listeners per frame, no layout changes. */
@Directive({
  selector: '[nxDepth]',
  host: { '(pointermove)': 'move($event)', '(pointerleave)': 'reset()' },
})
export class DepthDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly preferences = inject(PreferenceService);
  private frame = 0;
  constructor() {
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }
  move(event: PointerEvent): void {
    if (!this.preferences.motion() || event.pointerType !== 'mouse') return;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const bounds = this.element.getBoundingClientRect();
      this.element.style.setProperty(
        '--depth-x',
        `${((event.clientX - bounds.left) / bounds.width - 0.5) * 4}deg`,
      );
      this.element.style.setProperty(
        '--depth-y',
        `${((event.clientY - bounds.top) / bounds.height - 0.5) * -4}deg`,
      );
    });
  }
  reset(): void {
    cancelAnimationFrame(this.frame);
    this.element.style.setProperty('--depth-x', '0deg');
    this.element.style.setProperty('--depth-y', '0deg');
  }
}
