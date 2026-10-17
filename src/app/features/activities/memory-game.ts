import {
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MemoryEngine } from '../../core/services/memory-engine';
import { ProgressService } from '../../core/services/progress.service';
import { PageHeadingComponent } from '../../shared/components/page-heading';
import { IllustrationComponent } from '../../shared/components/illustration';
import { IconComponent } from '../../shared/components/icon';
import { MessageComponent } from '../../shared/components/message';
import { NexitoComponent } from '../../shared/components/nexito';
import { BrandMarkComponent } from '../../shared/components/brand-mark';

@Component({
  selector: 'nx-memory-game',
  imports: [
    RouterLink,
    PageHeadingComponent,
    IllustrationComponent,
    IconComponent,
    MessageComponent,
    NexitoComponent,
    BrandMarkComponent,
  ],
  templateUrl: './memory-game.html',
  styleUrl: './memory-game.scss',
})
export class MemoryGameComponent {
  private readonly engine = new MemoryEngine();
  private readonly progress = inject(ProgressService);
  private readonly revision = signal(0);
  readonly phase = signal<'instructions' | 'playing' | 'complete'>('instructions');
  readonly paused = signal(false);
  readonly seconds = signal(0);
  readonly announcement = signal('');
  readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('resultDialog');
  private interval?: ReturnType<typeof setInterval>;
  private mismatch?: ReturnType<typeof setTimeout>;
  private frame?: number;
  private startedAt = 0;
  private elapsedMs = 0;
  readonly state = computed(() => {
    this.revision();
    return {
      cards: this.engine.cards.map((c) => ({ ...c })),
      selected: [...this.engine.selected],
      matches: this.engine.matches,
      errors: this.engine.errors,
      locked: this.engine.locked,
    };
  });
  readonly clock = computed(
    () =>
      `${Math.floor(this.seconds() / 60)
        .toString()
        .padStart(2, '0')}:${(this.seconds() % 60).toString().padStart(2, '0')}`,
  );
  constructor() {
    const visibility = () => {
      if (document.hidden && this.phase() === 'playing' && !this.paused()) this.pause();
    };
    document.addEventListener('visibilitychange', visibility);
    inject(DestroyRef).onDestroy(() => {
      this.clearTimers();
      if (this.frame) cancelAnimationFrame(this.frame);
      document.removeEventListener('visibilitychange', visibility);
    });
  }
  start(): void {
    this.dialog()?.nativeElement.close();
    this.clearTimers();
    this.engine.reset();
    this.revision.update((v) => v + 1);
    this.seconds.set(0);
    this.elapsedMs = 0;
    this.paused.set(false);
    this.phase.set('playing');
    this.announcement.set('Partida iniciada. Descubre dos tarjetas para buscar una pareja.');
    this.startClock();
    this.frame = requestAnimationFrame(() =>
      document.querySelector<HTMLButtonElement>('.memory-tile')?.focus(),
    );
  }
  private startClock(): void {
    this.startedAt = Date.now();
    this.interval = setInterval(
      () => this.seconds.set(Math.floor((this.elapsedMs + Date.now() - this.startedAt) / 1000)),
      250,
    );
  }
  private clearTimers(): void {
    clearInterval(this.interval);
    clearTimeout(this.mismatch);
  }
  pause(): void {
    if (this.phase() !== 'playing') return;
    if (this.paused()) {
      this.paused.set(false);
      this.startClock();
      this.announcement.set('Continuamos. Tómate el tiempo que necesites.');
    } else {
      this.elapsedMs += Date.now() - this.startedAt;
      clearInterval(this.interval);
      this.paused.set(true);
      this.announcement.set('Partida en pausa. El cronómetro está detenido.');
    }
  }
  flip(id: number): void {
    if (this.phase() !== 'playing' || this.paused()) return;
    const result = this.engine.flip(id);
    if (result === 'ignored') return;
    this.revision.update((v) => v + 1);
    if (result === 'first') {
      this.announcement.set(
        `${this.engine.cards.find((c) => c.id === id)!.label}. Busca su pareja.`,
      );
      return;
    }
    if (result === 'miss') {
      this.announcement.set('Estas imágenes son diferentes. Puedes volver a intentarlo.');
      this.mismatch = setTimeout(() => {
        this.engine.conceal();
        this.revision.update((v) => v + 1);
      }, 1100);
    } else {
      this.announcement.set(`¡Una pareja más! ${this.engine.matches} de 6 encontradas.`);
      if (this.engine.complete) this.finish();
    }
  }
  private finish(): void {
    this.elapsedMs += Date.now() - this.startedAt;
    this.seconds.set(Math.floor(this.elapsedMs / 1000));
    this.clearTimers();
    this.phase.set('complete');
    this.progress.record({
      matches: this.engine.matches,
      errors: this.engine.errors,
      seconds: this.seconds(),
    });
    this.announcement.set('¡Completaste la aventura! Encontraste las seis parejas.');
    this.frame = requestAnimationFrame(() => this.dialog()?.nativeElement.showModal());
  }
  closeResults(): void {
    this.dialog()?.nativeElement.close();
    requestAnimationFrame(() => document.getElementById('play-again')?.focus());
  }
}
