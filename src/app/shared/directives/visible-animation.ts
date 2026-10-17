import { DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';

/** Suspend decorative CSS animation when the containing illustration leaves the viewport. */
@Directive({ selector: '[nxVisibleAnimation]', host: { '[class.out-of-view]': '!visible()' } })
export class VisibleAnimationDirective {
  readonly visible = signal(false);
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const observer = new IntersectionObserver(
      (entries) => this.visible.set(entries[0]?.isIntersecting ?? false),
      { rootMargin: '30px' },
    );
    observer.observe(element);
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }
}
