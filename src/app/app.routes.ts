import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio · NexoAprende',
    data: { label: 'Inicio' },
    loadComponent: () => import('./features/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'experiencia',
    title: 'Tu experiencia · NexoAprende',
    data: { label: 'Tu experiencia' },
    loadComponent: () =>
      import('./features/experience-selector/experience-selector').then(
        (m) => m.ExperienceSelectorComponent,
      ),
  },
  {
    path: 'panel',
    title: 'Mi espacio · NexoAprende',
    data: { label: 'Mi espacio' },
    loadComponent: () =>
      import('./features/child-dashboard/child-dashboard').then((m) => m.ChildDashboardComponent),
  },
  {
    path: 'actividades',
    title: 'Actividades · NexoAprende',
    data: { label: 'Actividades' },
    loadComponent: () =>
      import('./features/activities/activity-catalog').then((m) => m.ActivityCatalogComponent),
  },
  {
    path: 'actividades/memory',
    title: 'Encuentra las parejas · NexoAprende',
    data: { label: 'Encuentra las parejas' },
    loadComponent: () =>
      import('./features/activities/memory-game').then((m) => m.MemoryGameComponent),
  },
  {
    path: 'actividades/attention',
    title: 'Atención · NexoAprende',
    data: { label: 'Atención' },
    loadComponent: () =>
      import('./features/activities/activity-preview').then((m) => m.ActivityPreviewComponent),
  },
  {
    path: 'actividades/reading',
    title: 'Lectura · NexoAprende',
    data: { label: 'Lectura' },
    loadComponent: () =>
      import('./features/activities/activity-preview').then((m) => m.ActivityPreviewComponent),
  },
  {
    path: 'progreso',
    title: 'Mi progreso · NexoAprende',
    data: { label: 'Mi progreso' },
    loadComponent: () => import('./features/progress/progress').then((m) => m.ProgressComponent),
  },
  {
    path: 'tutor',
    title: 'Panel del tutor · NexoAprende',
    data: { label: 'Para tutores' },
    loadComponent: () =>
      import('./features/tutor-demo/tutor-demo').then((m) => m.TutorDemoComponent),
  },
  {
    path: 'profesional',
    title: 'Panel profesional · NexoAprende',
    data: { label: 'Para profesionales' },
    loadComponent: () =>
      import('./features/professional-demo/professional-demo').then(
        (m) => m.ProfessionalDemoComponent,
      ),
  },
  {
    path: 'ayuda',
    title: 'Ayuda y accesibilidad · NexoAprende',
    data: { label: 'Ayuda y accesibilidad' },
    loadComponent: () => import('./features/help/help').then((m) => m.HelpComponent),
  },
  {
    path: '**',
    title: 'Página no encontrada · NexoAprende',
    data: { label: 'Página no encontrada' },
    loadComponent: () => import('./features/help/not-found').then((m) => m.NotFoundComponent),
  },
];
