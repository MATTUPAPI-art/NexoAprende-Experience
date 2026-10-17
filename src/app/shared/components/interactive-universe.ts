import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { PreferenceService } from '../../core/services/preference.service';
import { Body, advance, contain } from '../../core/models/universe-physics';
import { FloatingObjectComponent, OBJECT_NAMES, UniverseCategory } from './floating-object';
import { IconComponent } from './icon';

@Component({
  selector: 'nx-interactive-universe',
  imports: [FloatingObjectComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './interactive-universe.html',
  styleUrl: './interactive-universe.scss',
})
export class InteractiveUniverseComponent implements AfterViewInit {
  readonly preferences = inject(PreferenceService);
  readonly category = signal<UniverseCategory>('planets');
  readonly categories: { id: UniverseCategory; label: string }[] = [
    { id: 'planets', label: 'Planetas' },
    { id: 'balls', label: 'Pelotas' },
    { id: 'animals', label: 'Animales' },
  ];
  readonly names = OBJECT_NAMES;
  readonly throws = signal(0);
  readonly paused = signal(false);
  readonly bonus = signal(false);
  readonly bodies = signal<Body[]>([]);
  readonly field = viewChild<ElementRef<HTMLElement>>('field');
  private width = 1;
  private height = 1;
  private frame = 0;
  private last = 0;
  private visible = false;
  private destroyed = false;
  private paintFrame = 0;
  private gesture?: {
    body: Body;
    pointer: number;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    time: number;
    vx: number;
    vy: number;
    moved: boolean;
    offsetX: number;
    offsetY: number;
  };
  private keyboardBody?: Body;
  private keyMoved = false;
  private bonusTimer?: ReturnType<typeof setTimeout>;
  constructor() {
    effect(() => {
      this.preferences.motion();
      this.paused();
      this.sync();
    });
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      cancelAnimationFrame(this.frame);
      cancelAnimationFrame(this.paintFrame);
      clearTimeout(this.bonusTimer);
      this.cleanup?.();
    });
  }
  ngAfterViewInit(): void {
    const element = this.field()!.nativeElement;
    const resize = new ResizeObserver(() => this.resize());
    resize.observe(element);
    const intersection = new IntersectionObserver((entries) => {
      this.visible = entries[0].isIntersecting;
      this.sync();
    });
    intersection.observe(element);
    const visibility = () => this.sync();
    document.addEventListener('visibilitychange', visibility);
    // DestroyRef must be captured in injection context, not in this lifecycle hook.
    this.cleanup = () => {
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
    this.resize();
    this.sync();
  }
  private cleanup?: () => void;
  private resize(): void {
    const rect = this.field()!.nativeElement.getBoundingClientRect();
    const oldWidth = this.width,
      oldHeight = this.height;
    this.width = rect.width;
    this.height = rect.height;
    if (!this.bodies().length || this.bodies().length !== (this.width < 500 ? 4 : 6)) this.seed();
    else
      for (const body of this.bodies()) {
        body.x = (body.x / oldWidth) * this.width;
        body.y = (body.y / oldHeight) * this.height;
      }
    for (const body of this.bodies()) contain(body, this.width, this.height);
    this.paint();
  }
  choose(category: UniverseCategory): void {
    this.category.set(category);
    this.gesture = undefined;
    this.keyboardBody = undefined;
    this.seed();
  }
  private seed(): void {
    const count = this.width < 500 ? 4 : 6;
    this.bodies.set(
      Array.from({ length: count }, (_, id) => {
        const radius = (this.width < 500 ? 29 : 36) + [2, 10, 5, -3, 0, -6][id];
        return {
          id,
          radius,
          mass: (radius * radius) / 1000,
          x: (((id % 3) + 0.5) * this.width) / 3,
          y: ((Math.floor(id / 3) + 0.5) * this.height) / 2,
          vx: Math.cos(id * 2.4) * 38,
          vy: Math.sin(id * 2.4 + 0.6) * 34,
          held: false,
        };
      }),
    );
    for (const body of this.bodies()) contain(body, this.width, this.height);
    cancelAnimationFrame(this.paintFrame);
    this.paintFrame = requestAnimationFrame(() => {
      if (!this.destroyed) this.paint();
    });
  }
  private sync(): void {
    cancelAnimationFrame(this.frame);
    this.last = 0;
    if (
      !this.destroyed &&
      this.field() &&
      this.preferences.motion() &&
      !this.paused() &&
      !document.hidden &&
      this.visible
    )
      this.frame = requestAnimationFrame((time) => this.tick(time));
  }
  private tick(time: number): void {
    advance(this.bodies(), this.width, this.height, this.last ? (time - this.last) / 1000 : 0);
    this.last = time;
    this.paint();
    this.frame = requestAnimationFrame((next) => this.tick(next));
  }
  private paint(): void {
    const nodes = this.field()?.nativeElement.querySelectorAll<HTMLElement>('.floating-body');
    nodes?.forEach((node, index) => {
      const b = this.bodies()[index];
      if (b) node.style.transform = `translate3d(${b.x - b.radius}px,${b.y - b.radius}px,0)`;
    });
  }
  down(event: PointerEvent, body: Body): void {
    if (this.gesture || event.button !== 0) return;
    const field = this.field()!.nativeElement.getBoundingClientRect();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    body.held = true;
    body.vx = 0;
    body.vy = 0;
    this.gesture = {
      body,
      pointer: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      time: event.timeStamp,
      vx: 0,
      vy: 0,
      moved: false,
      offsetX: event.clientX - field.left - body.x,
      offsetY: event.clientY - field.top - body.y,
    };
  }
  move(event: PointerEvent): void {
    const g = this.gesture;
    if (!g || g.pointer !== event.pointerId) return;
    const rect = this.field()!.nativeElement.getBoundingClientRect(),
      dt = Math.max(8, event.timeStamp - g.time) / 1000;
    g.vx = Math.max(-900, Math.min(900, (event.clientX - g.lastX) / dt));
    g.vy = Math.max(-900, Math.min(900, (event.clientY - g.lastY) / dt));
    g.moved ||= Math.hypot(event.clientX - g.startX, event.clientY - g.startY) >= 12;
    g.body.x = event.clientX - rect.left - g.offsetX;
    g.body.y = event.clientY - rect.top - g.offsetY;
    contain(g.body, this.width, this.height);
    g.lastX = event.clientX;
    g.lastY = event.clientY;
    g.time = event.timeStamp;
    this.paint();
  }
  up(event: PointerEvent, cancelled = false): void {
    const g = this.gesture;
    if (!g || event.pointerId !== g.pointer) return;
    g.body.held = false;
    if (!cancelled && g.moved) {
      const recent = event.timeStamp - g.time < 120;
      g.body.vx = recent ? g.vx : 0;
      g.body.vy = recent ? g.vy : 0;
      this.award();
    }
    this.gesture = undefined;
  }
  key(event: KeyboardEvent, body: Body): void {
    const dirs: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    if (dirs[event.key]) {
      event.preventDefault();
      if (this.keyboardBody !== body) {
        this.cancelKey();
        this.keyboardBody = body;
      }
      body.held = true;
      const oldX = body.x,
        oldY = body.y;
      const [x, y] = dirs[event.key];
      body.x += x * 18;
      body.y += y * 18;
      body.vx = x * 180;
      body.vy = y * 180;
      contain(body, this.width, this.height);
      this.keyMoved ||= Math.hypot(body.x - oldX, body.y - oldY) > 0;
      this.paint();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (this.keyboardBody === body && this.keyMoved) {
        body.held = false;
        this.keyboardBody = undefined;
        this.keyMoved = false;
        this.award();
      }
    } else if (event.key === 'Escape') this.cancelKey();
  }
  cancelKey(): void {
    if (this.keyboardBody) this.keyboardBody.held = false;
    this.keyboardBody = undefined;
    this.keyMoved = false;
  }
  private award(): void {
    this.throws.update((n) => n + 1);
    this.bonus.set(false);
    clearTimeout(this.bonusTimer);
    this.bonus.set(true);
    this.bonusTimer = setTimeout(() => this.bonus.set(false), 700);
  }
  reset(): void {
    this.throws.set(0);
    this.bonus.set(false);
    clearTimeout(this.bonusTimer);
  }
}
