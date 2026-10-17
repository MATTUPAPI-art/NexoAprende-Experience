import { TestBed, ComponentFixture } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MultimediaBackgroundComponent } from './multimedia-background';
import { VisibleAnimationDirective } from '../directives/visible-animation';
import { PreferenceService } from '../../core/services/preference.service';

describe('Local video loading and accessible pause', () => {
  let fixture: ComponentFixture<MultimediaBackgroundComponent>;
  function create(mobile = false, reduced = false) {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('prefers-reduced-motion') ? reduced : mobile,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    fixture = TestBed.createComponent(MultimediaBackgroundComponent);
    fixture.componentRef.setInput('videoSrc', '/unit-test-fixture.mp4');
    fixture.detectChanges();
    fixture.debugElement.injector.get(VisibleAnimationDirective).visible.set(true);
    fixture.detectChanges();
    fixture.detectChanges();
    return fixture.componentInstance;
  }
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (
      this: HTMLMediaElement,
    ) {
      this.dispatchEvent(new Event('playing'));
      return Promise.resolve();
    });
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (
      this: HTMLMediaElement,
    ) {
      this.dispatchEvent(new Event('pause'));
    });
  });
  afterEach(() => {
    fixture?.destroy();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  it('does not render or request a video without a verified asset', () => {
    create();
    fixture.componentRef.setInput('videoSrc', undefined);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('video')).toBeNull();
    expect(fixture.nativeElement.querySelector('.video-control')).toBeNull();
  });
  it('defers the video until visible and pauses it when outside the viewport', () => {
    create();
    const visible = fixture.debugElement.injector.get(VisibleAnimationDirective);
    expect(fixture.nativeElement.querySelector('video')).not.toBeNull();
    visible.visible.set(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('video')).toBeNull();
  });
  it('requires a deliberate play action on mobile and renders a muted inline video', () => {
    const component = create(true);
    expect(fixture.nativeElement.querySelector('video')).toBeNull();
    component.toggle();
    fixture.detectChanges();
    fixture.detectChanges();
    const video = fixture.nativeElement.querySelector('video') as HTMLVideoElement;
    expect(video).not.toBeNull();
    expect(video.muted).toBe(true);
    expect(video.hasAttribute('playsinline')).toBe(true);
  });
  it('never loads video with system reduced motion, even after a play request', () => {
    const component = create(false, true);
    component.toggle();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('video')).toBeNull();
    expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
  });
  it('removes the video when the global animation preference is paused', () => {
    create();
    TestBed.inject(PreferenceService).toggleMotion();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('video')).toBeNull();
  });
  it('supports an explicitly paused secondary film until the user asks to play', () => {
    create();
    fixture.componentRef.setInput('autoPlay', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('video')).toBeNull();
    fixture.componentInstance.toggle();
    fixture.detectChanges();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('video')).not.toBeNull();
  });
  it('keeps a pause control usable and provides a fallback on media failure', () => {
    const component = create();
    component.playing.set(true);
    component.toggle();
    fixture.detectChanges();
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    component.failed.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('video')).toBeNull();
    expect(fixture.nativeElement.querySelector('.contrast-layer')).not.toBeNull();
  });
});
