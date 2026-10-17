import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService, stageForAge } from '../../core/services/profile.service';
import { Stage } from '../../core/models/models';
import { PageHeadingComponent } from '../../shared/components/page-heading';
import { IconComponent } from '../../shared/components/icon';
import { WorldSceneComponent } from '../../shared/components/world-scene';
import { NexitoComponent } from '../../shared/components/nexito';
import { DepthDirective } from '../../shared/directives/depth';
import { StageArtComponent } from '../../shared/components/stage-art';

@Component({
  selector: 'nx-experience-selector',
  imports: [
    FormsModule,
    PageHeadingComponent,
    IconComponent,
    WorldSceneComponent,
    NexitoComponent,
    DepthDirective,
    StageArtComponent,
  ],
  templateUrl: './experience-selector.html',
  styleUrl: './experience-selector.scss',
})
export class ExperienceSelectorComponent {
  private readonly profiles = inject(ProfileService);
  private readonly router = inject(Router);
  readonly name = signal(this.profiles.profile().name);
  readonly age = signal(this.profiles.profile().age);
  readonly stage = computed(() => stageForAge(this.age()));
  readonly stageLabel = computed(
    () => ({ child: 'Infancia', junior: 'Etapa juvenil', teen: 'Adolescencia' })[this.stage()],
  );
  readonly currentWorld = computed(() => this.stages.find((item) => item.id === this.stage())!);
  readonly stages: readonly {
    id: Stage;
    label: string;
    range: string;
    age: number;
    title: string;
    description: string;
    number: string;
    tag: string;
  }[] = [
    {
      id: 'child',
      label: 'Infancia',
      range: '5–9 años',
      age: 7,
      title: 'El mundo de las grandes aventuras',
      description:
        'Manos curiosas, colores sin reglas y mucho por imaginar. Aquí, aprender es jugar.',
      number: '01',
      tag: 'CREAR · JUGAR · IMAGINAR',
    },
    {
      id: 'junior',
      label: 'Juvenil',
      range: '10–13 años',
      age: 11,
      title: 'Tu laboratorio creativo',
      description:
        'Conecta pistas, pon a prueba tus ideas y descubre lo que pasa cuando te atreves a explorar.',
      number: '02',
      tag: 'EXPLORAR / CONECTAR / DESCUBRIR',
    },
    {
      id: 'teen',
      label: 'Adolescencia',
      range: '14–18 años',
      age: 16,
      title: 'El estudio de nuevas conexiones',
      description:
        'Menos ruido, más espacio para pensar. Elige tus retos y construye tu manera de aprender.',
      number: '03',
      tag: 'ENFOQUE — AUTONOMÍA — IDEAS',
    },
  ];
  save(): void {
    this.profiles.save(this.name(), this.age());
    void this.router.navigateByUrl('/panel');
  }
}
