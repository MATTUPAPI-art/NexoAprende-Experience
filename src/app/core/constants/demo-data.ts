import { Activity, Profile, Professional, Questionnaire } from '../models/models';

export const DEMO_PROFILE: Profile = { id: 'local-explorer', name: 'Alex', age: 10 };
export const ACTIVITIES: readonly Activity[] = [
  {
    id: 'attention',
    name: 'Encuentra los perros',
    area: 'Atención',
    description: 'Abre bien los ojos y descubre a nuestros amigos entre las formas.',
    difficulty: 'Inicial',
    minutes: 3,
    available: false,
    icon: 'scan',
    tag: 'Observa y descubre',
  },
  {
    id: 'memory',
    name: 'Encuentra las parejas',
    area: 'Memoria',
    description: 'Conecta imágenes, descubre parejas y sorprende a tu memoria.',
    difficulty: 'Inicial',
    minutes: 5,
    available: true,
    icon: 'cards',
    tag: 'Conecta y recuerda',
  },
  {
    id: 'reading',
    name: 'Un mundo entre líneas',
    area: 'Lectura',
    description: 'Cada historia es una aventura. Lee, imagina y encuentra su significado.',
    difficulty: 'Inicial',
    minutes: 4,
    available: false,
    icon: 'book',
    tag: 'Lee e imagina',
  },
];
export const DEMO_WEEK = [
  { label: 'L', value: 38 },
  { label: 'M', value: 68 },
  { label: 'X', value: 46 },
  { label: 'J', value: 88 },
  { label: 'V', value: 62 },
  { label: 'S', value: 24 },
  { label: 'D', value: 0 },
];
export const DEMO_PROFILES: readonly Profile[] = [
  DEMO_PROFILE,
  { id: 'demo-lucia', name: 'Lucía', age: 8 },
];
export const DEMO_PROFESSIONAL: Professional = {
  id: 'demo-pro',
  name: 'María Torres',
  specialty: 'Acompañamiento educativo',
  profileIds: ['local-explorer', 'demo-lucia'],
};
export const QUESTIONNAIRES: readonly Questionnaire[] = [
  {
    id: 'habits',
    title: 'Así me gusta aprender',
    description:
      'Conversación educativa sobre preferencias. Sin puntuación ni interpretación clínica.',
    questions: [
      '¿Qué actividad disfrutaste más hoy?',
      '¿Prefieres leer, escuchar o ver imágenes?',
      '¿Cuándo te gustaría hacer una pausa?',
    ],
  },
  {
    id: 'reflection',
    title: 'Mi momento de descubrimiento',
    description: 'Guía de reflexión para acompañar una sesión.',
    questions: ['¿Qué descubriste hoy?', '¿Qué te gustaría intentar otra vez?'],
  },
];
export const MEMORY_SYMBOLS = [
  { symbol: '🌙', label: 'Luna' },
  { symbol: '🚀', label: 'Cohete' },
  { symbol: '🌈', label: 'Arcoíris' },
  { symbol: '🦋', label: 'Mariposa' },
  { symbol: '🌻', label: 'Girasol' },
  { symbol: '🪐', label: 'Planeta' },
];
