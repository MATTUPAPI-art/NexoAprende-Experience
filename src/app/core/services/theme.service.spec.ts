import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ThemeService } from './theme.service';
describe('Persistent day and night theme', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });
  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
  });
  it('defaults to day and saves a separate preference without changing educational data', () => {
    localStorage.setItem('nexo.results', '[{"id":"existing"}]');
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('day');
    service.toggle();
    TestBed.tick();
    expect(document.documentElement.dataset['theme']).toBe('night');
    expect(JSON.parse(localStorage.getItem('nexo.theme')!)).toBe('night');
    expect(localStorage.getItem('nexo.results')).toBe('[{"id":"existing"}]');
  });
  it('restores only a valid persisted theme', () => {
    localStorage.setItem('nexo.theme', '"night"');
    expect(TestBed.inject(ThemeService).theme()).toBe('night');
  });
});
