import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NexitoComponent } from './nexito';
import { ProfileService } from '../../core/services/profile.service';

describe('Nexito interactions', () => {
  let fixture: ComponentFixture<NexitoComponent>;
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = vi.fn();
        disconnect = vi.fn();
      },
    );
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProfileService,
          useValue: { profile: () => ({ name: 'Sol' }), stage: () => 'junior' },
        },
      ],
    });
    fixture = TestBed.createComponent(NexitoComponent);
    fixture.componentRef.setInput('interactive', true);
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });
  it('greets the current learner through a keyboard-operable native button and returns to its initial mood', () => {
    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.effectiveMood()).toBe('cheer');
    expect(fixture.nativeElement.querySelector('[aria-live]').textContent).toContain(
      '¡Hola, Sol! Soy Nexito.',
    );
    vi.advanceTimersByTime(2000);
    fixture.detectChanges();
    expect(fixture.componentInstance.effectiveMood()).toBe('greet');
  });
  it('reacts to a new game mood and selected world without editing domain data', () => {
    fixture.componentRef.setInput('mood', 'think');
    fixture.componentRef.setInput('stage', 'teen');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-mood')).toBe('think');
    expect(fixture.nativeElement.getAttribute('data-world')).toBe('teen');
    fixture.componentRef.setInput('mood', 'cheer');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.nexito-sparkles')).not.toBeNull();
  });
  it('cancels a pending greeting timer on teardown', () => {
    const nexito = fixture.componentInstance;
    nexito.greet();
    expect(nexito.waving()).toBe(true);
    fixture.destroy();
    vi.advanceTimersByTime(2100);
    expect(nexito.waving()).toBe(true);
  });
});
