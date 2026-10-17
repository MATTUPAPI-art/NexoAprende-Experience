import { computed, inject, Injectable, signal } from '@angular/core';
import { DEMO_PROFILE } from '../constants/demo-data';
import { Profile, Stage } from '../models/models';
import { StorageService } from './storage.service';

export function stageForAge(age: number): Stage {
  return age <= 9 ? 'child' : age <= 13 ? 'junior' : 'teen';
}
export function isProfile(value: unknown): value is Profile {
  if (!value || typeof value !== 'object') return false;
  const p = value as Partial<Profile>;
  return (
    p.id === DEMO_PROFILE.id &&
    typeof p.name === 'string' &&
    p.name.trim().length > 0 &&
    p.name.length <= 24 &&
    Number.isInteger(p.age) &&
    p.age! >= 5 &&
    p.age! <= 18
  );
}
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly storage = inject(StorageService);
  private readonly stored = this.storage.read('profile');
  private readonly state = signal<Profile>(
    isProfile(this.stored) ? this.stored : { ...DEMO_PROFILE },
  );
  readonly profile = this.state.asReadonly();
  readonly configured = signal(isProfile(this.stored));
  readonly stage = computed(() => stageForAge(this.profile().age));
  readonly stageLabel = computed(
    () => ({ child: 'Infancia', junior: 'Etapa juvenil', teen: 'Adolescencia' })[this.stage()],
  );
  save(name: string, age: number): void {
    const value: Profile = { id: DEMO_PROFILE.id, name: name.trim() || 'Alex', age };
    if (!isProfile(value)) throw new Error('Selecciona una edad entre 5 y 18 años.');
    this.state.set(value);
    this.configured.set(true);
    this.storage.write('profile', value);
  }
}
