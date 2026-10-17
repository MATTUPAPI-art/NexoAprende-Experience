import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProfileService, stageForAge } from './profile.service';
import { ProgressService } from './progress.service';
import { StorageService } from './storage.service';

describe('Age adaptation and local persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });
  it.each([
    [5, 'child'],
    [9, 'child'],
    [10, 'junior'],
    [13, 'junior'],
    [14, 'teen'],
    [18, 'teen'],
  ] as const)('maps age %i to %s', (age, stage) => expect(stageForAge(age)).toBe(stage));
  it('persists a valid nickname and age and restores them in a new service', () => {
    const profiles = TestBed.inject(ProfileService);
    profiles.save('  Nube  ', 14);
    expect(profiles.stage()).toBe('teen');
    TestBed.resetTestingModule();
    const restored = TestBed.inject(ProfileService);
    expect(restored.profile()).toMatchObject({ name: 'Nube', age: 14 });
    expect(restored.configured()).toBe(true);
  });
  it('rejects invalid ages instead of persisting them', () => {
    const p = TestBed.inject(ProfileService);
    for (const age of [4, 19, NaN, 10.5]) expect(() => p.save('Alex', age)).toThrow();
    expect(localStorage.getItem('nexo.profile')).toBeNull();
  });
  it('recovers from corrupt storage and invalid result records', () => {
    localStorage.setItem('nexo.profile', '{bad');
    localStorage.setItem('nexo.results', JSON.stringify([{ seconds: -5 }, { matches: 6 }]));
    expect(TestBed.inject(ProfileService).profile().age).toBe(10);
    expect(TestBed.inject(StorageService).available()).toBe(true);
    expect(TestBed.inject(ProgressService).summary().sessions).toBe(0);
  });
  it('records and restores actual sessions with correct aggregate totals', () => {
    const progress = TestBed.inject(ProgressService);
    progress.record({ matches: 6, errors: 2, seconds: 65 });
    progress.record({ matches: 6, errors: 3, seconds: 40 });
    expect(progress.summary()).toEqual({ sessions: 2, matches: 12, errors: 5, seconds: 105 });
    expect(progress.weeklyGoal()).toBeCloseTo(66.666);
    TestBed.resetTestingModule();
    expect(TestBed.inject(ProgressService).results().length).toBe(2);
  });
  it('does not count old sessions toward the weekly goal', () => {
    const progress = TestBed.inject(ProgressService);
    const result = progress.record({ matches: 6, errors: 0, seconds: 10 });
    localStorage.setItem(
      'nexo.results',
      JSON.stringify([{ ...result, completedAt: '2020-01-01T00:00:00Z' }]),
    );
    TestBed.resetTestingModule();
    const restored = TestBed.inject(ProgressService);
    expect(restored.summary().sessions).toBe(1);
    expect(restored.weeklyGoal()).toBe(0);
  });
  it('keeps results in memory when storage is unavailable', () => {
    const store = TestBed.inject(StorageService);
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Full', 'QuotaExceededError');
    });
    const progress = TestBed.inject(ProgressService);
    progress.record({ matches: 6, errors: 0, seconds: 7 });
    expect(progress.summary().sessions).toBe(1);
    expect(store.available()).toBe(false);
    spy.mockRestore();
  });
  it('caps history at 200 valid records', () => {
    const progress = TestBed.inject(ProgressService);
    for (let i = 0; i < 202; i++) progress.record({ matches: 6, errors: 0, seconds: i });
    expect(progress.results().length).toBe(200);
    expect(progress.results()[0].seconds).toBe(201);
  });
});
