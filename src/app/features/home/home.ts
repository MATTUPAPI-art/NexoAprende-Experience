import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivityService } from '../../core/services/activity.service';
import { ProfileService } from '../../core/services/profile.service';
import { PreferenceService } from '../../core/services/preference.service';
import { ProgressService } from '../../core/services/progress.service';
import { ActivityCardComponent } from '../../shared/components/activity-card';
import { IconComponent } from '../../shared/components/icon';
import { MultimediaBackgroundComponent } from '../../shared/components/multimedia-background';
import { ProgressBarComponent } from '../../shared/components/progress-bar';
import { MessageComponent } from '../../shared/components/message';
import { WorldSceneComponent } from '../../shared/components/world-scene';
import { NexitoComponent } from '../../shared/components/nexito';
import { MEDIA } from '../../core/constants/media-manifest';
import { RevealDirective } from '../../shared/directives/reveal';
import { InteractiveUniverseComponent } from '../../shared/components/interactive-universe';

@Component({
  selector: 'nx-home',
  imports: [
    RouterLink,
    DecimalPipe,
    ActivityCardComponent,
    WorldSceneComponent,
    NexitoComponent,
    IconComponent,
    MultimediaBackgroundComponent,
    ProgressBarComponent,
    MessageComponent,
    RevealDirective,
    InteractiveUniverseComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  readonly media = MEDIA;
  readonly profiles = inject(ProfileService);
  readonly activities = inject(ActivityService);
  readonly progress = inject(ProgressService);
  readonly preferences = inject(PreferenceService);
  readonly hero = viewChild<ElementRef<HTMLElement>>('hero');
  readonly benefits = [
    { icon: 'shield', label: 'Un espacio seguro' },
    { icon: 'leaf', label: 'A tu propio ritmo' },
    { icon: 'sparkles', label: 'Hecho para ti' },
  ];
  move(event: PointerEvent): void {
    if (!this.preferences.motion() || event.pointerType !== 'mouse') return;
    const element = this.hero()?.nativeElement;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty(
      '--parallax-x',
      `${(event.clientX - rect.left - rect.width / 2) / 70}px`,
    );
    element.style.setProperty(
      '--parallax-y',
      `${(event.clientY - rect.top - rect.height / 2) / 70}px`,
    );
  }
  reset(): void {
    const style = this.hero()?.nativeElement.style;
    style?.setProperty('--parallax-x', '0px');
    style?.setProperty('--parallax-y', '0px');
  }
}
