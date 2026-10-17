import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PreferenceService } from './preference.service';

describe('Motion preferences', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });
  function media(matches: boolean) {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    vi.stubGlobal('matchMedia', () => ({ matches, addEventListener, removeEventListener }));
    return { addEventListener, removeEventListener };
  }
  it('persists the visible motion toggle', () => {
    media(false);
    const p = TestBed.inject(PreferenceService);
    expect(p.motion()).toBe(true);
    p.toggleMotion();
    expect(p.motion()).toBe(false);
    TestBed.resetTestingModule();
    expect(TestBed.inject(PreferenceService).motion()).toBe(false);
  });
  it('honors OS reduced motion even if a saved preference requests animation', () => {
    localStorage.setItem('nexo.preferences', JSON.stringify({ motion: true }));
    media(true);
    const p = TestBed.inject(PreferenceService);
    expect(p.motion()).toBe(false);
    p.toggleMotion();
    expect(p.motion()).toBe(false);
  });
  it('responds to live OS preference changes and removes its listener on destroy', () => {
    const mock = media(false);
    const p = TestBed.inject(PreferenceService);
    const callback = mock.addEventListener.mock.calls[0][1] as (event: {
      matches: boolean;
    }) => void;
    callback({ matches: true });
    expect(p.motion()).toBe(false);
    callback({ matches: false });
    expect(p.motion()).toBe(true);
    TestBed.resetTestingModule();
    expect(mock.removeEventListener).toHaveBeenCalledWith('change', callback);
  });
});
