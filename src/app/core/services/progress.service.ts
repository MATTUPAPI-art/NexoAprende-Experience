import { computed, inject, Injectable, signal } from '@angular/core';
import { Progress, Result } from '../models/models';
import { StorageService } from './storage.service';
import { ProfileService } from './profile.service';

export function isResult(value: unknown): value is Result {
  if (!value || typeof value !== 'object') return false;
  const r = value as Partial<Result>;
  return (
    typeof r.id === 'string' &&
    typeof r.profileId === 'string' &&
    r.activityId === 'memory' &&
    typeof r.completedAt === 'string' &&
    Number.isFinite(Date.parse(r.completedAt)) &&
    r.matches === 6 &&
    Number.isInteger(r.errors) &&
    r.errors! >= 0 &&
    Number.isInteger(r.seconds) &&
    r.seconds! >= 0 &&
    typeof r.level === 'string'
  );
}
@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly storage = inject(StorageService);
  private readonly profiles = inject(ProfileService);
  private readonly stored = this.storage.read('results');
  private readonly state = signal<Result[]>(
    Array.isArray(this.stored) ? this.stored.filter(isResult).slice(0, 200) : [],
  );
  readonly results = computed(() =>
    this.state().filter((r) => r.profileId === this.profiles.profile().id),
  );
  readonly summary = computed<Progress>(() =>
    this.results().reduce(
      (p, r) => ({
        sessions: p.sessions + 1,
        matches: p.matches + r.matches,
        errors: p.errors + r.errors,
        seconds: p.seconds + r.seconds,
      }),
      { sessions: 0, matches: 0, errors: 0, seconds: 0 },
    ),
  );
  readonly weeklyGoal = computed(() =>
    Math.min(
      100,
      (this.results().filter((r) => Date.now() - Date.parse(r.completedAt) < 7 * 86400000).length /
        3) *
        100,
    ),
  );
  record(data: Pick<Result, 'matches' | 'errors' | 'seconds'>): Result {
    const result: Result = {
      ...data,
      id: crypto.randomUUID(),
      profileId: this.profiles.profile().id,
      activityId: 'memory',
      completedAt: new Date().toISOString(),
      level: 'Inicial',
    };
    if (!isResult(result)) throw new Error('Resultado inválido');
    this.state.update((values) => [result, ...values].slice(0, 200));
    this.storage.write('results', this.state());
    return result;
  }
}
