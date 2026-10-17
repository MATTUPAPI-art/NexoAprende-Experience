import { DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';

/** One entrance per section; content remains visible if motion is off or before observation. */
@Directive({ selector: '[nxReveal]', host: { '[class.section-arrived]': 'arrived()' } })
export class RevealDirective {
  readonly arrived = signal(false);
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.arrived.set(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }
}
